import {updateObjectInArray} from "../utils/objects-helper";
import {userType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux_store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";
import {APIResponseType, ResultCodeEnum} from "../api/api";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 20,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const usersReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'users/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId,
          "id", {followed: true})
      }
    case 'users/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId,
          "id", {followed: false})
      }
    case 'users/SET_USERS': {
      return {...state, users: action.users}
    }
    case 'users/SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'users/SET_TOTAL_USERS_COUNT': {
      return {...state, totalUserCount: action.count}
    }
    case 'users/TOGGLE_IS_FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    case 'users/SET_FILTER': {
      return {
        ...state,
        filter: action.payload
      }
    }
    default:
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
  setUsers: (users: Array<userType>) => ({type: 'users/SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
  setFilter: (filter: FilterType) => ({type: 'users/SET_FILTER', payload: filter} as const),
  setTotalUsersCount: (count: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', count} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
  } as const)

}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))
    const data = await usersAPI.getUser(page, pageSize,filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: (userId: number)=>Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsType) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
  }
}
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
  }
}

export default usersReducer