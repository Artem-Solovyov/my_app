import React from "react";
import {actionCreatorAddMessage, actionCreatorAddMessageText} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {StoreContext} from "../../StoreContext";

const DialogsContainer = (props) => {

  return (<StoreContext.Consumer>
        {store => {
          let state = store.getState()

          let addMessage = () => {
            store.dispatch(actionCreatorAddMessage())
          }

          let addMessageNewText = (text) => {
            store.dispatch(actionCreatorAddMessageText(text))
          }

          return <Dialogs dialogsPage={state.dialogsPage}
                          addMessage={addMessage}
                          addMessageNewText={addMessageNewText}/>
        }}
      </StoreContext.Consumer>
  )
}
export default DialogsContainer