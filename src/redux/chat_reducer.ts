import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux_store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/Chat_api";
import {AnyAction, Dispatch} from "redux";


let initialState = {
  messages: [] as ChatMessageAPIType[],
  status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
      }
    case 'chat/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => (
    {type: 'chat/MESSAGES_RECEIVED', payload: {messages}} as const),
  statusChanged: (status: StatusType) => (
    {type: 'chat/STATUS_CHANGED', payload: {status}} as const),
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
    return _statusChangedHandler
  }
}

let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
    return _newMessagesHandler
  }
}

export const startMessagesListening = (): ThunkType => async (dispatch)  => {
  chatAPI.start()
  // @ts-ignore
  chatAPI.subscribe('messages-received',newMessagesHandlerCreator(dispatch))
  // @ts-ignore
  chatAPI.subscribe('status-changed',statusChangedHandlerHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  // @ts-ignore
  chatAPI.unsubscribe('messages-received',newMessagesHandlerCreator(dispatch))
  // @ts-ignore
  chatAPI.unsubscribe('status-changed',statusChangedHandlerHandlerCreator(dispatch))
  chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
type InitialStateType = typeof initialState

export default chatReducer
