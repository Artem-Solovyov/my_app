import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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
  ],
  profile: null,
  status: "",
}

const profileReducer = (state = initialState, action) => {
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
        profile: {...state.profile, photos: action.photos}
      }
    default:
      return state
  }
}

export const actionCreatorAddPost = (newPostText) => ({type: ADD_POST, newPostText})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({type: SET_STATUS, status})
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}
export const updateUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}
export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
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