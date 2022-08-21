import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Morty1.png'
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false)
  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
   saveProfile(formData).then(()=>{
     setEditMode(false)
   })
  }
  return (
      <div>
        <div className={s.discription_block}>
          <div className={s.containerMainPhoto}>
            <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt='ava'/>
            {isOwner && <input className={s.savePhoto} type={"file"} onChange={onMainPhotoSelected}/>}
          </div>
          {editMode
              ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
              : <ProfileData profile={profile} status={status}
                             updateUserStatus={updateUserStatus}
                             isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}

        </div>
      </div>
  )
}
const ProfileData = ({profile, status, updateUserStatus, isOwner, goToEditMode}) => {
  return (
      <div className={s.containerInfoUser}>
        <div className={s.name}>
          <h2>{profile.fullName}</h2>
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>

        <div className={s.userInfo}>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {profile.lookingForAJob &&
              <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
              </div>
          }
          {profile.aboutMe &&
              <div>
                <b>About me:</b> {profile.aboutMe}
              </div>
          }
          <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            if (profile.contacts[key]) {
              return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            }
          })}
          </div>
        </div>
        {isOwner && <div className={s.edit}>
          <button onClick={goToEditMode}>Edit</button>
        </div>}
      </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contacs}>
    <b>{contactTitle}:</b> <tt> {contactValue}</tt>
  </div>
}


export default ProfileInfo