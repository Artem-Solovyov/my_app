import React from "react";
import styles from './FormsControls.module.css'
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

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
export const Input = ({input, meta: {touched, error }, ...props}) => {
  const hasError = touched && error
  return (
      <div className={styles.form_control + ' ' + (hasError ? styles.error : ' ') }>
        <div>
          <input {...props} {...input}  />
        </div>
        {hasError && <span>{error}</span>}
      </div>
  )
}

export const createField = (placeholder, name, validate, component, props = {}, text = "" ) => (
    <div>
      <Field placeholder={placeholder}
             name={name} component={component}
             validate={validate} {...props}/>
      {text}
    </div>
)