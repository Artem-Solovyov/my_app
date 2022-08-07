import React from "react";

import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (
      <div>
        <div>
          <img
              src="https://www.kultur-port.de/images/stories/blog/2022/Horizont_F_Pexelspixabay.jpg"
              className={s.first_img} alt='ava'/>
        </div>
        {/* avatar and description */}
        <div className={s.discription_block}>
          <img
              src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"
              className={s.second_img}  alt='ava'
          />
        </div>
      </div>
  )
}

export default ProfileInfo