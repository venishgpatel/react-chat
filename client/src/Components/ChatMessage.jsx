import {KeyboardArrowDown as KeyboardArrowDownIcon} from '@mui/icons-material';
import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../App';

const ChatMessage = ({ messageData, setCurrentThreadId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userName = useContext(UserContext);

  const isOwnMessage = userName === messageData.userName;

  const onClickReply = (threadId) => {
    setAnchorEl(null);
    setCurrentThreadId(threadId);
  }

  return (
    <>
      <div
        id={`chat-message-${messageData.messageId}`}
        className={`chat-message__container ${isOwnMessage ? 'own-message' : ''}`}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <div className='chat-message__message'>
          <div className='chat-message__metadata'>
            <div className='chat-message__username'>
              {`${messageData.userName}${isOwnMessage ? ' (Me)' : ''}`}
            </div>
            <div className='chat-message__time'>{messageData.time}</div>
          </div>
          <div className='chat-message__text'>{messageData.message}</div>
          {/* {messageData.threadMessages.length > 0 && (
            <div>
              {messageData.threadMessages.map((threadMessage) => {
                return (
                  <div>
                    <hr />
                    <div>{threadMessage.userName}</div>
                    <div>{threadMessage.message}</div>
                    <div>{threadMessage.time}</div>
                    <hr />
                  </div>
                )
              })}
            </div>
          )} */}
        </div>
        <KeyboardArrowDownIcon />
      </div>
      <Menu
        id='chat-message-menu'
        aria-labelledby={`chat-message-${messageData.messageId}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            onClickReply(messageData.messageId)
          }}
        >
          Reply</MenuItem>
      </Menu>
    </>
  )
}

export default ChatMessage;