import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialised: false,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state, initialised: true,
      }
    default:
      return state
  }
}

export const initializedSuccess = () => (
    {type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  promise.then(()=>{dispatch(initializedSuccess())})
}

export default initializeApp
