import {AppStateType} from "./redux_store";

export const selectIsAuth = (state:AppStateType) => {
  return state.auth.isAuth
}
export const selectLogin = (state:AppStateType) => {
  return state.auth.login
}