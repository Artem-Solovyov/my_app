import * as axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "162f073c-e76a-463d-97c0-1a9822020c8c"
  }
})

export const usersAPI = {
  getUser(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
  },
  follow(userId) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },
}
export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId)
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId)
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {status: status})
  },
  savePhoto(photoFile) {
    let formData = new FormData()
    formData.append("image", photoFile)
    return instance.put(`profile/photo/`,formData, {headers: {'Content-type': "multipart/form-data"}})
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false, captcha=null) {
    return instance.post('auth/login', {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete('auth/login')
  },
}
export const securityAPI = {
  getCaptchaURL() {
    return instance.get('security/get-captcha-url')
  },
}

