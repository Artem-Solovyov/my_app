import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../types/types";

type PropsType = {
  profile: profileType | null
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: profileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
  return (

      <div>
        <ProfileInfo profile={props.profile} isOwner={props.isOwner}
                     status={props.status} updateUserStatus={props.updateUserStatus}
                     savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
        <MyPostsContainer/>
      </div>
  )
}

export default Profile