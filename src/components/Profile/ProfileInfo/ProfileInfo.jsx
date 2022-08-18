import React from "react";

import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"

const ProfileInfo = (props) => {
  if (!props.profile){
    return <Preloader />
  }
  return (
      <div>
        {/*<div>*/}
        {/*  <img*/}
        {/*      src="https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png"*/}
        {/*      className={s.first_img} alt='ava'/>*/}
        {/*</div>*/}
        {/* avatar and description */}
        <div className={s.discription_block}>
          <img src={props.profile.photos.large} className={s.second_img}  alt='ava'/>
          <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
      </div>
  )
}

export default ProfileInfo