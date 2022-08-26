import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./MessageItem/Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs_reducer";

export type OwnPropsType = {
  dialogsPage: InitialStateType
  addMessage: (messageText: string) => void
}
export type NewMessageFormType = {
  newMessageBody: string
}
type PropsType =  {}
type NewMessageValuesKeysTypes = Extract<keyof NewMessageFormType, string>
const Dialogs: React.FC<OwnPropsType> = (props) => {

  let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}></DialogItem>)

  let messageElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}></Message>)

  let addNewMessage = (values: {newMessageBody: string}) => {

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


const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageValuesKeysTypes>("Enter your message", 'newMessageBody', [required, maxLengthCreator(50)], Textarea)}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}
const AddMessageFormRedux = reduxForm<NewMessageFormType, PropsType>({form: 'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs