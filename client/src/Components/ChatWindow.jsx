import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatList from './ChatList';
import ChatSend from './ChatSend';
import { Close as CloseIcon } from '@mui/icons-material';
import { UserContext } from "../App";

const ChatWindow = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [threadMessage, setThreadMessage] = useState('');
  const [messageIdList, setMessageIdList] = useState([]);
  const [allMessages, setAllMessages] = useState({});
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const userName = useContext(UserContext);

  useEffect(() => {
    socket.on('receive_message', (data) => onReceiveMessage(data))
  }, [socket]);

  const onReceiveMessage = (data, isOwnMessage) => {
    const messageId = data.messageId;
    const threadId = data.threadId;

    if (threadId) {
      setAllMessages((prevAllMessages) => (
        {
          ...prevAllMessages,
          [`${messageId}`]: data,
          [`${threadId}`]: {
            ...prevAllMessages[threadId],
            threadMessageIds: [...prevAllMessages[threadId].threadMessageIds, messageId]
          }
        }
      ));
    } else {
      setMessageIdList((prevMessageIdList) => [...prevMessageIdList, messageId])
      setAllMessages((prevAllMessages) => (
        {...prevAllMessages, [`${messageId}`]: data }
      ))
    }
    if (isOwnMessage) {
      setMessage('');
    }
  }

  const sendMessage = async (isThreadMessage) => {
    console.log("sendMessage: ", isThreadMessage)
    let messsageText = isThreadMessage ? threadMessage : message;
    if (!messsageText) return null;
    const currentDate = new Date(Date.now());
    const messageData = {
      userName,
      message: messsageText,
      messageId: uuidv4(),
      threadId: isThreadMessage ? currentThreadId : null,
      threadMessageIds: isThreadMessage ? null : [],
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
    }
    console.log(`Sending Data to Server${messageData.messageId}`)
    await socket.emit('send_message', messageData);

    onReceiveMessage(messageData, true);
  }

  return (
    <div className="chat-window">
      <div className='chat-window__main'>
        <ChatList
          messageIdList={messageIdList}
          allMessages={allMessages}
          setCurrentThreadId={setCurrentThreadId}
        ></ChatList>
        <div className='chat-window-footer'>
          <ChatSend
            currentThreadId={currentThreadId}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          ></ChatSend>
        </div>
      </div>
      {currentThreadId && (
        <div className='chat-window__thread'>
          <h3 className='chat-window__title'>
            <span>Thread</span>
            <CloseIcon onClick={() => setCurrentThreadId(null)} />
          </h3>
          <ChatList
            messageIdList={allMessages[currentThreadId].threadMessageIds}
            allMessages={allMessages}
            setCurrentThreadId={setCurrentThreadId}
          ></ChatList>
          <div className='chat-window-footer'>
            <ChatSend
              currentThreadId={currentThreadId}
              message={threadMessage}
              setMessage={setThreadMessage}
              sendMessage={sendMessage}
              isThreadMessage={true}
            ></ChatSend>
          </div>
        </div>
      )}
    </div>
  )
};

export default ChatWindow;