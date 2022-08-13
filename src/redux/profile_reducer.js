const ADD_POST = 'ADD-POST';
const ADD_NEW_POST_TEXT = 'ADD-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE'


let initialState = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 4, post: 'Yo', likesCount: 0},
  ],
  newPostText: '',
  profile: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 10,
        post: state.newPostText,
        likesCount: 0,
      }
      return  {
        ...state,
        posts: [newPost, ...state.posts],
        newPostText: ''
      }
    case ADD_NEW_POST_TEXT:
      return  {
        ...state,
        newPostText: action.newText
      }
    case SET_USER_PROFILE:
      return  {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }

}

export const actionCreatorAddPost = () => ({type: ADD_POST})
export const actionCreatorAddPostText = (text) => ({type: ADD_NEW_POST_TEXT, newText: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export default profileReducer