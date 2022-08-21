import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect( () => {setStatus(props.status)}, [props.status]  )

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
      <div className={s.status}>
        {!editMode &&
            <div>
              <span onDoubleClick={activateEditMode}>{props.status || "Not status."}</span>
            </div>
        }
        {editMode &&
            <div>
              <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
              value={status}/>
            </div>
        }
      </div>
  )
}

export default ProfileStatusWithHooks