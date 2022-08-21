import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {required} from "../utils/validators/validators";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaURL: null,
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (id, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}})

export const getCaptchaURLSuccess = (captchaURL) => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaURL}})

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
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
export const logout = () => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
export const getCaptchaURL = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaURL = response.data.url;
  dispatch(getCaptchaURLSuccess(captchaURL));
}

export default authReducer
