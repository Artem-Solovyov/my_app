import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'



let initialState = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 4, post: 'Yo', likesCount: 0},
  ] as Array<postsType>,
  profile: null as profileType | null,
  status: "",
  newPostText: ''
}
export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 10,
        post: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId)
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as profileType
      }
    default:
      return state
  }
}

type actionCreatorAddPostType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const actionCreatorAddPost = (newPostText: string):actionCreatorAddPostType => ({type: ADD_POST, newPostText})

type deletePostType = {
  type: typeof DELETE_POST,
  postId: number
}
export const deletePost = (postId:number):deletePostType => ({type: DELETE_POST, postId})

type setUserProfileType = {
  type: typeof SET_USER_PROFILE,
  profile: profileType
}
const setUserProfile = (profile:profileType):setUserProfileType => ({type: SET_USER_PROFILE, profile})

type setStatusType = {
  type: typeof SET_STATUS,
  status: string
}
const setStatus = (status:string): setStatusType => ({type: SET_STATUS, status})

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: photosType
}
const savePhotoSuccess = (photos:photosType):savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => async (dispatch:any) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId:number) => async (dispatch:any) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}
export const updateUserStatus = (status:string) => async (dispatch:any) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}
export const savePhoto = (file: any) => async (dispatch:any) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = (profile: profileType) => async (dispatch:any, getState:Function) => {
  const userId = getState().auth.id
  const response = await profileAPI.saveProfile(profile)
  debugger
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer