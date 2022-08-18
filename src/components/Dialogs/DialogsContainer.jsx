import React from "react";
import {actionCreatorAddMessage} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



const mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
})
const mapDispatchToProps = (dispatch) => ({
  addMessage: (newMessageBody) => {dispatch(actionCreatorAddMessage(newMessageBody))},
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)