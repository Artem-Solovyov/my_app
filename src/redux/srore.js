import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import sidebarReducer from "./sidebar_reducer";

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
    sidebar: {},
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
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    this._callSubscribe(this._state)
  },
}



export default store