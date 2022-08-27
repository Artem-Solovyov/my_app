import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login as logins} from "../../redux/auth_reducer";
import {Navigate} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux_store";
import {AnyAction} from "redux";

type propsOwnType = {
  captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, propsOwnType> & propsOwnType> = ({handleSubmit, error, captchaURL}) => {
  return (
      <form onSubmit={handleSubmit}>
        {createField<loginFormValuesTypeKeys>("Email", 'email', [required], Input)}
        {createField<loginFormValuesTypeKeys>("Password", 'password', [required], Input, {type: 'password'})}
        {createField<loginFormValuesTypeKeys>("Enter", 'rememberMe', [], Input, {type: 'checkbox'}, "Remember me")}
        { captchaURL && <img src={captchaURL} alt={"captcha"}/>}
        { captchaURL && createField<loginFormValuesTypeKeys>("Symbols from image", 'captcha', [required], Input)}
        {error && <div className={styles.form_summary_error}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </form>
  )
}
const LoginReduxForm = reduxForm<loginFormValuesType, propsOwnType>({form: 'login'})(LoginForm)
type loginFormValuesTypeKeys = GetStringKeys<loginFormValuesType>

export type loginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const Login: React.FC = (props) => {

  const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: loginFormValuesType) => {
    dispatch(logins(formData.email, formData.password, formData.rememberMe, formData.captcha) as unknown as AnyAction)
  }
  if (isAuth) {
    return <Navigate to={"/profile"}/>
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>
    </div>
  )
}
