import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../common/FormsControls/FormsControls.module.css";
import {profileType} from "../../../types/types";

type PropsType = {
profile: profileType
}
type ProfileTypeKeys = GetStringKeys<profileType>

const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return (
      <form onSubmit={handleSubmit} className={s.containerInfoUser}>
        <div>
          <b>Full name:</b>
          {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div className={s.userInfo}>
          <div>
            <b>Looking for a job:</b>
            {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
          </div>
          <div>
            <b>My professional skills:</b>
            {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
          </div>

          <div>
            <b>About me:</b>
            {createField<ProfileTypeKeys>("About me", "aboutMe", [], Input)}
          </div>

          <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return (
                <div key={key}>{key}:
                  {createField(key, "contacts." + key, [], Input)}
                </div>
            )
          })}
          </div>
        </div>
        {error && <div className={styles.form_summary_error}>{error}</div>}
        <div className={s.edit}>
          <button>Save</button>
        </div>
      </form>
  )
}

const ProfileDataReduxForm = reduxForm<profileType, PropsType>({
  form: "edit-profile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileDataForm)
export default ProfileDataReduxForm;