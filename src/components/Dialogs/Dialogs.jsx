import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./MessageItem/Message";
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {

  let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}></DialogItem>)

  let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}></Message>)

  let onAddMessage = () => {
    props.addMessage()
  }
  let onMessageChang = (event) => {
    let text = event.target.value
    props.addMessageNewText(text)
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
                      value={props.dialogsPage.newMessageBody}/>
            <button onClick={onAddMessage}>Send</button>
          </div>
        </div>
      </div>)
}

export default Dialogs