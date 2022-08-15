import React from "react";
import {actionCreatorAddMessage, actionCreatorAddMessageText} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
  isAuth: state.auth.isAuth,
})
const mapDispatchToProps = (dispatch) => ({
  addMessage: () => {dispatch(actionCreatorAddMessage())},
  addMessageNewText: (text) => dispatch(actionCreatorAddMessageText(text))
})

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer