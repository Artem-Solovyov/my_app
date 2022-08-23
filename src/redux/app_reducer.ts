import {getAuthUserData} from "./auth_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type initialStateType = {
  initialised: boolean
}
let initialState: initialStateType = {
  initialised: false,
}

export const appReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state, initialised: true,
      }
    default:
      return state
  }
}

type initializedSuccessType ={
  type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():initializedSuccessType => (
  {type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(initializedSuccess())
  })
}

export default initializeApp
