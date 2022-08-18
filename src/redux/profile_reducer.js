import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'


let initialState = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 4, post: 'Yo', likesCount: 0},
  ],
  profile: null,
  status: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 10,
        post: action.newPostText,
        likesCount: 0,
      }
      return  {
        ...state,
        posts: [newPost, ...state.posts],
        // newPostText: ''
      }
    case SET_USER_PROFILE:
      return  {
        ...state,
        profile: action.profile
      }
      case SET_STATUS:
      return  {
        ...state,
        status: action.status
      }
    default:
      return state
  }

}

export const actionCreatorAddPost = (newPostText) => ({type: ADD_POST, newPostText})
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfile = (userId) => (dispatch) => {
  return  profileAPI.getProfile(userId).then(response => {
    dispatch(setUserProfile(response.data))
  })
}
export const getUserStatus = (userId) => (dispatch) => {
  return  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response.data))
  })
}
export const updateUserStatus = (status) => (dispatch) => {
  return  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  })
}

export default profileReducer