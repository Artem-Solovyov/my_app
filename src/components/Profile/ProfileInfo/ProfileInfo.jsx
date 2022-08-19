import React from "react";

import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
  if (!profile){
    return <Preloader />
  }
  return (
      <div>
        <div className={s.discription_block}>
          <img src={profile.photos.large} className={s.second_img}  alt='ava'/>
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>
      </div>
  )
}

export default ProfileInfo