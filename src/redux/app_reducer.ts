import {getAuthUserData} from "./auth_reducer";
import {InferActionsTypes} from "./redux_store";

let initialState = {
  initialised: false,
}
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const appReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'app/INITIALIZED_SUCCESS':
      return {
        ...state, initialised: true,
      }
    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const),
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default initializeApp
