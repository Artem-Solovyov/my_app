const ADD_MESSAGE = 'ADD-MESSAGE';

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
}
const dialogsReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return  {
        ...state,
        messages: [...state.messages, {id: 5, message: action.newMessageBody}],
      }
    default:
      return state
  }
}
export const actionCreatorAddMessage = (newMessageBody) => ({
  type: ADD_MESSAGE,
  newMessageBody,
})


export default dialogsReducer