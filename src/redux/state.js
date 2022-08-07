const ADD_POST = 'ADD-POST';
const ADD_NEW_POST_TEXT = 'ADD-NEW-POST-TEXT';

const ADD_MESSAGE = 'ADD-MESSAGE';
const ADD_NEW_MESSAGE_TEXT = 'ADD-NEW-MESSAGE-TEXT';
let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, post: 'Hi my name Artem', likesCount: 12},
        {id: 2, post: 'Hello World!!!)', likesCount: 2},
        {id: 3, post: 'I love React.JS', likesCount: 23},
        {id: 3, post: 'Yo', likesCount: 0},
      ],
      newPostText: '',
    },
    dialogsPage: {
      dialogs: [
        {id: 1, name: 'Artem'},
        {id: 2, name: 'Chat'},
        {id: 3, name: 'Neon'},
        {id: 4, name: 'Sawyer'},
        {id: 5, name: 'Prokuror'},
      ],
      messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello bro)'},
        {id: 3, message: 'Fuck'},
        {id: 3, message: 'Yo'},
        {id: 3, message: 'Pidor.'},
        {id: 3, message: 'Slava Ukraine!!!'},
        {id: 3, message: 'Yo'},
      ],
      newMessageBody: ''
    },
  },
  _callSubscribe() {
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscribe = observer
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        post: this._state.profilePage.newPostText,
        likesCount: 0,
      }
      this._state.profilePage.posts.unshift(newPost)
      this._state.profilePage.newPostText = ''
      this._callSubscribe(this._state)
    } else if (action.type === ADD_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText
      this._callSubscribe(this._state)
    } else if (action.type === ADD_MESSAGE) {
      let newMessage = {
        id: 5,
        message: this._state.dialogsPage.newMessageBody,
      }
      this._state.dialogsPage.messages.push(newMessage)
      this._state.dialogsPage.newMessageBody = ''
      this._callSubscribe(this._state)
    } else if (action.type === ADD_NEW_MESSAGE_TEXT) {
      this._state.dialogsPage.newMessageBody = action.newText
      this._callSubscribe(this._state)
    }
  },
}
export const actionCreatorAddPost = () => ({
  type: ADD_POST
})
export const actionCreatorAddPostText = (text) => ({
  type: ADD_NEW_POST_TEXT,
  newText: text
})
export const actionCreatorAddMessage = () => ({
  type: ADD_MESSAGE
})
export const actionCreatorAddMessageText = (text) => ({
  type: ADD_NEW_MESSAGE_TEXT,
  newText: text
})

export default store