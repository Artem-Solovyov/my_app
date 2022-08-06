import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./MessageItem/Message";


const Dialogs = (props) => {

  let dialogElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name}></DialogItem>)

  let messageElements = props.state.messages.map(m => <Message message={m.message}></Message>)

  return (<div className={s.dialogs}>
    <div className={s.dialogsItems}>
      {dialogElements}
    </div>
    <div className={s.messages}>
      {messageElements}
    </div>
  </div>)
}

export default Dialogs