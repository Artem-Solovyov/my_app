import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./MessageItem/Message";
import {actionCreatorAddMessage, actionCreatorAddMessageText} from "../../redux/dialogs_reducer";


const Dialogs = (props) => {

  let dialogElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name}></DialogItem>)

  let messageElements = props.state.messages.map(m => <Message message={m.message}></Message>)
  // let messageText = React.createRef()
  let addMessage = () => {
    props.dispatch(actionCreatorAddMessage())
  }
  let onMessageChang = (event) => {
    let text = event.target.value
    props.dispatch(actionCreatorAddMessageText(text))
  }

  return (
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogElements}
        </div>
        <div className={s.messages}>
          {messageElements}
          <div>
            <textarea name="" placeholder='Enter your message' onChange={onMessageChang}  id="" cols="40" rows="3"
                      value={props.state.newMessageBody}/>
            <button onClick={addMessage}>Send</button>
          </div>
        </div>
      </div>)
}

export default Dialogs