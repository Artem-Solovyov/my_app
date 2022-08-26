import {photosType, profileType} from "../types/types";
import {instance, APIResponseType} from "./api";
type SavePhotoType = {
  photos: photosType
}
export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<profileType>(`profile/` + userId).then(res=>res.data)
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then(res=>res.data)
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status/`, {status: status}).then(res=>res.data)
  },
  savePhoto(photoFile: File) {
    let formData = new FormData()
    formData.append("image", photoFile)
    return instance.put<APIResponseType<SavePhotoType>>(`profile/photo/`, formData,
      {headers: {'Content-type': "multipart/form-data"}}).then(res=>res.data)
  },
  saveProfile(profile: profileType) {
    return instance.put<APIResponseType>(`profile`, profile).then(res=>res.data)
  },
}