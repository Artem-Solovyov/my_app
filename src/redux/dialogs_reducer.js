const ADD_MESSAGE = 'ADD-MESSAGE';
const ADD_NEW_MESSAGE_TEXT = 'ADD-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 5,
        message: state.newMessageBody,
      }
      state.messages.push(newMessage)
      state.newMessageBody = ''
      return state
    case ADD_NEW_MESSAGE_TEXT:
      state.newMessageBody = action.newText
      return state
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