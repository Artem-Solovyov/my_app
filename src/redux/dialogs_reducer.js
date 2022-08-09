const ADD_MESSAGE = 'ADD-MESSAGE';
const ADD_NEW_MESSAGE_TEXT = 'ADD-NEW-MESSAGE-TEXT';

let initialState = {
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
}
const dialogsReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return  {
        ...state,
        messages: [...state.messages, {id: 5, message: state.newMessageBody}],
        newMessageBody: ''
      }
    case ADD_NEW_MESSAGE_TEXT:
      return  {
        ...state,
        newMessageBody: action.newText
      }
    default:
      return state
  }
}
export const actionCreatorAddMessage = () => ({
  type: ADD_MESSAGE
})
export const actionCreatorAddMessageText = (text) => ({
  type: ADD_NEW_MESSAGE_TEXT,
  newText: text
})

export default dialogsReducer