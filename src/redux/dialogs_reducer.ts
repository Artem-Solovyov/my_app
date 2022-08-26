import {InferActionsTypes} from "./redux_store";

type dialogsType = {
  id: number
  name: string
}
type messageType = {
  id: number
  message: string
}
let initialState = {
  dialogs: [
    {id: 1, name: 'Artem'},
    {id: 2, name: 'Chat'},
    {id: 3, name: 'Neon'},
    {id: 4, name: 'Sawyer'},
    {id: 5, name: 'Prokuror'},
  ] as Array<dialogsType>,
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hello bro)'},
    {id: 3, message: 'Fuck'},
    {id: 3, message: 'Yo'},
    {id: 3, message: 'Pidor.'},
    {id: 3, message: 'Slava Ukraine!!!'},
    {id: 3, message: 'Yo'},
  ] as Array<messageType>,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state=initialState, action:ActionsType):InitialStateType => {
  switch (action.type) {
    case 'dialogs/ADD-MESSAGE':
      return  {
        ...state,
        messages: [...state.messages, {id: 5, message: action.newMessageBody}],
      }
    default:
      return state
  }
}

export const actions = {
  sendMessage: (newMessageBody: string) => ({
    type: 'dialogs/ADD-MESSAGE',
    newMessageBody,
  } as const)
}


export default dialogsReducer