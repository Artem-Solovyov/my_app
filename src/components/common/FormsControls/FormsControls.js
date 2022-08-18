import React from "react";
import styles from './FormsControls.module.css'

export const Textarea = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  return (
      <div className={styles.form_control + ' ' + (hasError ? styles.error : ' ') }>
        <div>
          <textarea {...props} {...input}  />
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
  )
}
export const Input = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  return (
      <div className={styles.form_control + ' ' + (hasError ? styles.error : ' ') }>
        <div>
          <input {...props} {...input}  />
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
  )
}