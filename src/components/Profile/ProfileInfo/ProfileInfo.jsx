import React from "react";

import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (
      <div>
        <div>
          <img
              src="https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png"
              className={s.first_img} alt='ava'/>
        </div>
        {/* avatar and description */}
        <div className={s.discription_block}>
          <img
              src="http://pngimg.com/uploads/rick_morty/rick_morty_PNG34.png"
              className={s.second_img}  alt='ava'
          />
        </div>
      </div>
  )
}

export default ProfileInfo