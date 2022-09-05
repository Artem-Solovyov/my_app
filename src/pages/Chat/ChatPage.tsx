import React, { useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../api/Chat_api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat_reducer";
import {AppStateType} from "../../redux/redux_store";


type PropsType = {}
const ChatPage: React.FC<PropsType> = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat: React.FC = () => {
  const status = useSelector((state: AppStateType) => state.chat.status)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(startMessagesListening())
    return () => {
      // @ts-ignore
      // dispatch(stopMessagesListening())
    }
  }, [])


  return (
    <div>
      {status === 'error' && <div>Error. Please refresh the page</div>}
      <>
        <Messages/>
        <AddMessageForm/>
      </>

    </div>
  )
}

const Messages: React.FC = () => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
const element = e.currentTarget
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  return (
    <div style={{height: '300px', overflowY: 'auto', marginBottom: '20px', maxWidth: '700px', marginLeft: '40px'}} onScroll={scrollHandler}>
      {messages.map((m, index) => <Message key={index} message={m}/>)}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}
const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
  const id = useSelector((state: AppStateType) => state.auth.id)
  return (
    <div>
      { id === message.userId ? <div style={{textAlign: 'right'}}>
          <b>{message.userName}</b> <img src={message.photo} style={{width: "40px", borderRadius: '50%'}}/>
        <br/>
        <div style={{
          textAlign: 'left',
          borderRadius: '7px',
          paddingLeft: '7px',
          marginRight: '45px',
          display: 'inline-block',
          minWidth: '150px',
          minHeight: '25px',
          backgroundColor: 'blueviolet'
        }}>{message.message}</div>
      </div>
      : <div><img src={message.photo} style={{width: "40px", borderRadius: '50%'}}/> <b>{message.userName}</b>
          <br/>
          <div style={{
            borderRadius: '7px',
            paddingLeft: '7px',
            marginLeft: '45px',
            display: 'inline-block',
            minWidth: '150px',
            minHeight: '25px',
            backgroundColor: 'blueviolet'
          }}>{message.message}</div>
        </div>}
    </div>
  )
})
const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    // @ts-ignore
    dispatch(sendMessage(message))
    setMessage('')
  }
  return (
    <div style={{maxWidth: '700px', marginLeft: '40px', display: "flex"}}>
      <div>
        <textarea placeholder={'Enter your message...'}
                  cols={90}
                  onChange={(e) => setMessage((e.currentTarget.value))}
                  value={message}></textarea>
      </div>
      <div style={{marginLeft: '20px', marginTop: '10px'}}>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  )
}

export default ChatPage