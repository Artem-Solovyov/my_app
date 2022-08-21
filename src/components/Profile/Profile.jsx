import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
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