import React, {Component, ComponentType} from "react";
import {actions} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux_store";



const mapStateToProps = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect,
)(Dialogs)