import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helper";
import {photosType, userType} from "../types/types";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
  users: [] as Array<userType>,
  pageSize: 20,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
}
type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false } )
      }
    case SET_USERS: {
      return {...state, users: action.users}
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUserCount: action.count}
    }
    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state
  }
}
type followSuccessType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId:number):followSuccessType => ({type: FOLLOW, userId})
type unfollowSuccessType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId:number):unfollowSuccessType => ({type: UNFOLLOW, userId})
type setUsersType = {
  type: typeof SET_USERS
  users: Array<userType>
}
export const setUsers = (users: Array<userType>):setUsersType => ({type: SET_USERS, users})
type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage:number):setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (count:number): setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, count})
type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching:boolean):toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type toggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
})

export const requestUsers = (page:number, pageSize:number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUser(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }
}
const followUnfollowFlow =async (dispatch:any, userId:number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const follow = (userId:number) => {
  return async (dispatch:any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}
export const unfollow = (userId:number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

export default usersReducer