import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux_store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})

type MapStatePropsType = {
  isAuth: boolean
}
type DispatchPropsType = {}
export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>)  {
  const RedirectComponent: React.FC<MapStatePropsType & DispatchPropsType> = (props) => {
    let {isAuth, ...restProps} = props
    if (!isAuth) return <Navigate to={'/login'}/>
  return <WrappedComponent {...restProps as unknown as WCP}  />
  }

  return connect<MapStatePropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {} )(RedirectComponent)
}