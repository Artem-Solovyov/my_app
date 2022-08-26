import React from "react";
import Header, {DispatchPropsType, StatePropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth_reducer";
import {AppStateType} from "../../redux/redux_store";

class HeaderContainer extends React.Component<StatePropsType & DispatchPropsType> {
  render() {
        return (
      <Header {...this.props} />
    )
}
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default  connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)