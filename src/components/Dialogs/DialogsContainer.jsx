import React from "react";
import {actionCreatorAddMessage, actionCreatorAddMessageText} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

  let state = props.store.getState()

  let addMessage = () => {
    props.store.dispatch(actionCreatorAddMessage())
  }

  let addMessageNewText = (text) => {
    props.store.dispatch(actionCreatorAddMessageText(text))
  }

  return <Dialogs dialogsPage={state.dialogsPage}
                  addMessage={addMessage}
                  addMessageNewText={addMessageNewText}/>
}
export default DialogsContainer