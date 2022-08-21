import React from "react";
import s from "./ProfileInfo.module.css";
import {createField} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import styles from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  return (
      <form onSubmit={handleSubmit} className={s.containerInfoUser}>
        <div>
          <b>Full name:</b>
          {createField("Full name", "fullName", [], "Input")}
        </div>
        <div className={s.userInfo}>
          <div>
            <b>Looking for a job:</b>
            {createField("", "lookingForAJob", [], "Input", {type: "checkbox"})}
          </div>
          <div>
            <b>My professional skills:</b>
            {createField("My professional skills", "lookingForAJobDescription", [], "textarea")}
          </div>

          <div>
            <b>About me:</b>
            {createField("About me", "aboutMe", [], "Input")}
          </div>

          <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return (
                <div key={key}>{key}:
                  {createField(key, "contacts." + key, [], "Input")}
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

const ProfileDataReduxForm = reduxForm({
  form: "edit-profile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileDataForm)
export default ProfileDataReduxForm;