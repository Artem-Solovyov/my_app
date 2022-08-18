import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./MessageItem/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Dialogs = (props) => {

  let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}></DialogItem>)

  let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}></Message>)

  let addNewMessage = (values) => {

    props.addMessage(values.newMessageBody)
  }

  return (
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogElements}
        </div>
        <div className={s.messages}>
          {messageElements}
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
      </div>)
}
const AddMessageForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Textarea} name={"newMessageBody"} placeholder='Enter your message'
                 validate={[required, maxLengthCreator(100)]}/>
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
  )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs