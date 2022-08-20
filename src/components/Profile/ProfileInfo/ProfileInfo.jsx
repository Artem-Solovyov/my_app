import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Morty1.png'

const ProfileInfo = ({profile, status, updateUserStatus}) => {
  if (!profile){
    return <Preloader />
  }
  return (
      <div>
        <div className={s.discription_block}>
          <img src={profile.photos.large || userPhoto } className={s.mainPhoto} alt='ava'/>
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>
      </div>
  )
}

export default ProfileInfo