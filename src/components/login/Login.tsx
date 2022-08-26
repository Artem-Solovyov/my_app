import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login as logins} from "../../redux/auth_reducer";
import {Navigate} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux_store";

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

type mapStateToPropsType = {
  isAuth: boolean
  captchaURL: string | null
}
type mapDispatchToPropsType = {
  logins: (email:string, password: string, rememberMe: boolean, captcha: string)=>void
}
export type loginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type loginFormValuesTypeKeys = GetStringKeys<loginFormValuesType>
const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: loginFormValuesType) => {
    props.logins(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }
  if (props.isAuth) {
    return <Navigate to={"/profile"}/>
  }
  return (
      <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
      </div>
  )
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL
})
export default connect(mapStateToProps, {logins})(Login)