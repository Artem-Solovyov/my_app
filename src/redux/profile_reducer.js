const ADD_POST = 'ADD-POST';
const ADD_NEW_POST_TEXT = 'ADD-NEW-POST-TEXT';


let initialState = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 3, post: 'Yo', likesCount: 0},
  ],
  newPostText: '',
}

const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        post: state.newPostText,
        likesCount: 0,
      }
      state.posts.unshift(newPost)
      state.newPostText = ''
      return state
    case ADD_NEW_POST_TEXT:
      state.newPostText = action.newText
      return state
    default:
      return state
  }

}

export const actionCreatorAddPost = () => ({
  type: ADD_POST
})
export const actionCreatorAddPostText = (text) => ({
  type: ADD_NEW_POST_TEXT,
  newText: text
})

export default profileReducer