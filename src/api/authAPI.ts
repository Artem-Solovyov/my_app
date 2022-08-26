import {instance, APIResponseType, ResultCodeEnum, ResulCodeForCaptchaEnum} from "./api";

type meDataType = {
  id: number,
  email: string,
  login: string
}
type loginDataType = {
    userId: number
}
export const authAPI = {
  me() {
    return instance.get<APIResponseType<meDataType>>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<APIResponseType<loginDataType, ResultCodeEnum | ResulCodeForCaptchaEnum >>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
  },
  logout() {
    return instance.delete('auth/login').then(res => res.data)
  },
}