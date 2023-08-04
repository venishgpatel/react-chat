import ChatMessage from './ChatMessage';

const ChatList = ({ messageIdList, allMessages, setCurrentThreadId }) => {
  return (
    <div className='chat-list'>
      {(Array.isArray(messageIdList) && messageIdList.length > 0) && messageIdList.map((messageId, index) => {
        console.log("allMessages", allMessages)
        const messageData = allMessages[messageId];
        return (
          <ChatMessage
            key={index}
            messageData={messageData}
            setCurrentThreadId={setCurrentThreadId}
          />
        ) 
      })}
    </div>
  )
}

export default ChatList;