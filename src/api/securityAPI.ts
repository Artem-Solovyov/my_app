import {instance} from "./api";
type GetCaptchaURL = {
  url: string
}
export const securityAPI = {
  getCaptchaURL() {
    return instance.get<GetCaptchaURL>('security/get-captcha-url').then(res=>res.data)
  },
}