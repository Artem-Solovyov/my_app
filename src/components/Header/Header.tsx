import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";


export type StatePropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: () => void
}
const Header: React.FC<StatePropsType & DispatchPropsType> = (props) => {
    return (
        <header className={styles.header}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_TV_2015.svg"/>
          <div className={styles.login_block}>
            {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> :<NavLink to={'/login'}>Login</NavLink> }
          </div>
      </header>
    )
}

export default Header