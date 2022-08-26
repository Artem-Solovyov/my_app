import axios from "axios";
import {userType} from "../types/types";


export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "162f073c-e76a-463d-97c0-1a9822020c8c"
  }
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResulCodeForCaptchaEnum {
  CaptchaIsRequired=10
}
export type GetItemsType = {
  items: Array<userType>
  totalCount: number
  error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: string[]
  resultCode: RC
}