import { stopSubmit } from "redux-form";
import {authAPI, securityAPI} from "../api/api";


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

export type initialStateType = {
  id: null | number,
  login: null | string,
  email: null | string,
  isAuth: boolean,
  captchaURL: null | string,
}
let initialState: initialStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaURL: null,
}

const authReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state, ...action.payload,
      }
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state, ...action.payload,
      }
    default:
      return state

  }
}
type setAuthUserDataPayloadType = {
  id:number | null,
  email:string | null,
  login:string | null,
  isAuth:boolean | null
}
type setAuthUserDataType = {
  type: typeof SET_USER_DATA
  payload: setAuthUserDataPayloadType
}

export const setAuthUserData = (id:number | null, email:string | null, login:string | null, isAuth:boolean | null):setAuthUserDataType => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}})


type getCaptchaURLSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaURL:string }
}
export const getCaptchaURLSuccess = (captchaURL:string):getCaptchaURLSuccessType => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaURL}})

export const getAuthUserData = () => async (dispatch:any) => {
  let response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}
export const login = (email:string, password: string, rememberMe: boolean, captcha: any) => async (dispatch:any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaURL())
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
    dispatch(stopSubmit("login", {_error: message}))

  }
}
export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
export const getCaptchaURL = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaURL = response.data.url;
  dispatch(getCaptchaURLSuccess(captchaURL));
}

export default authReducer
