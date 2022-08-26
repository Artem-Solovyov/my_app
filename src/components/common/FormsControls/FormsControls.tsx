import React from "react"
import styles from './FormsControls.module.css'
import {fieldValidatorType} from "../../../utils/validators/validators"
import {Field, WrappedFieldProps} from "redux-form"

export const Textarea: React.FC<WrappedFieldProps> = ({
                                                        input,
                                                        meta,
                                                        ...props
                                                      }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={styles.form_control + ' ' + (hasError ? styles.error : ' ')}>
      <div>
        <textarea {...props} {...input}  />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}
export const Input: React.FC<WrappedFieldProps> = ({
                                                     input,
                                                     meta: {touched, error},
                                                     ...props
                                                   }) => {
  const hasError = touched && error
  return (
    <div className={styles.form_control + ' ' + (hasError ? styles.error : ' ')}>
      <div>
        <input {...props} {...input}  />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export function createField<FormKeysType extends string>(placeholder: string, name: FormKeysType,
                                          validate: Array<fieldValidatorType>,
                                          component: React.FC<WrappedFieldProps>,
                                          props = {}, text = "") {
  return (
    <div>
      <Field placeholder={placeholder}
             name={name} component={component}
             validate={validate} {...props}/>
      {text}
    </div>
  )
}
export type GetStringKeys<T> = Extract<keyof T, string>
