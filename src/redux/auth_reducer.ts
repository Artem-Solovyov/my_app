import {stopSubmit} from "redux-form";
import {ResultCodeEnum, ResulCodeForCaptchaEnum} from "../api/api";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {BaseThunkType, InferActionsTypes} from "./redux_store";

let initialState= {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false as boolean,
  captchaURL: null as null | string,
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
    case 'auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state

  }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
export const actions = {
  setAuthUserData: (id: number | null, email: null | string, login: string | null, isAuth: boolean) => (
    {type: 'auth/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
  getCaptchaURLSuccess: (captchaURL:string | null ) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaURL}} as const)
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
  let data = await authAPI.me()
  if (data.resultCode === ResultCodeEnum.Success) {
    let {id, email, login} = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}
export const login = (email:string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if (data.resultCode === ResulCodeForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaURL())
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error"
    dispatch(stopSubmit("login", {_error: message}))
  }
}
export const logout = ():ThunkType => async (dispatch: any) => {
  let response = await authAPI.logout()
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}
export const getCaptchaURL = ():ThunkType => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaURL = data.url;
  dispatch(actions.getCaptchaURLSuccess(captchaURL));
}

export default authReducer
