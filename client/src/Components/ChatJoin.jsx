import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const ChatJoin = ({ socket, setUserName }) => {
  const [name, setName] = useState('');

  const joinChat = () => {
    if (!name) return null;
    socket.emit('join_chat')
    setUserName(name);
  };

  return (
    <>
      <h2 className='chat-join__title'>Join Chat</h2>
      <div className='chat-join__form'>
        <TextField
          id="input-username"
          placeholder='Please Enter Your Name'
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <Button
          variant="contained"
          onClick={joinChat}
          endIcon={<SendIcon />}
        >
          Join
        </Button>
      </div>
    </>
  )
}

export default ChatJoin;