import {FormAction, stopSubmit} from "redux-form";
import {photosType, postsType, profileType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {ResulCodeEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux_store";

let initialState = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 4, post: 'Yo', likesCount: 0},
  ] as Array<postsType>,
  profile: null as profileType | null,
  status: "",

}
export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST':
      let newPost = {
        id: 10,
        post: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case 'profile/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId)
      }
    case 'profile/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      }
    case 'profile/SET_STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as profileType
      }
    default:
      return state
  }
}

export const actions = {
  actionCreatorAddPost: (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const),
  deletePost: (postId:number) => ({type: 'profile/DELETE_POST', postId} as const),
  setUserProfile: (profile:profileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
  setStatus: (status:string) => ({type: 'profile/SET_STATUS', status} as const),
  savePhotoSuccess: (photos:photosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const)
}


export const getUserProfile = (userId:number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId:number): ThunkType  => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(data))
}
export const updateUserStatus = (status:string): ThunkType  => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}
export const savePhoto = (file: File): ThunkType  => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}
export const saveProfile = (profile: profileType): ThunkType  => async (dispatch, getState) => {
  const userId = getState().auth.id
  const data = await profileAPI.saveProfile(profile)
  debugger
  if (data.resultCode === ResulCodeEnum.Success) {
    if (userId != null) {
      dispatch(getUserProfile(userId))
    } else {
      throw new Error("userID cant be null")
    }
  } else {
    dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
    return Promise.reject(data.messages[0])
  }
}

export default profileReducer