import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, CreateField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login as logins} from "../../redux/auth_reducer";
import {Navigate} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'


const LoginForm = ({handleSubmit, error, captchaURL}) => {
  return (
      <form onSubmit={handleSubmit}>
        {createField("Email", 'email', [required], Input)}
        {createField("Password", 'password', [required], Input, {type: 'password'})}
        {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, "Remember me")}
        { captchaURL && <img src={captchaURL}/>}
        { captchaURL && createField("Symbols from image", 'captcha', [required], Input)}
        {error && <div className={styles.form_summary_error}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </form>
  )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
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
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL
})
export default connect(mapStateToProps, {logins})(Login)