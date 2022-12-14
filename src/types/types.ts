export type postsType = {
  id: number
  post: string
  likesCount: number
}
export type contactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}
export type photosType = {
  small: string | null
  large: string | null
}
export type profileType = {
  userId: number
  lookingForAJob: boolean | null
  lookingForAJobDescription: string | null
  fullName: string | null
  contacts: contactsType
  photos: photosType
  aboutMe: string

}
export type userType = {
  id: number
  name: string
  status: string
  photos: photosType
  followed: boolean
}