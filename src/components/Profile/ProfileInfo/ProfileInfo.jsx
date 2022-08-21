import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Morty1.png'

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  return (
      <div>
        <div className={s.discription_block}>
          <div className={s.containerMainPhoto}>
            <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt='ava'/>
            {isOwner && <input  className={s.savePhoto} type={"file"} onChange={onMainPhotoSelected}/>}
          </div>
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>
      </div>
  )
}

export default ProfileInfo