import {Button, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatSend = ({ isThreadMessage = false, currentThreadId, sendMessage, setMessage, message }) => {
  return (
    <>
      <TextField
        id="input-message"
        placeholder='Enter your message'
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
        }}
        onKeyDown={(event) => {
          event.key === 'Enter' && sendMessage(isThreadMessage)
        }}
        sx={{flex: 1}}
      />
      <Button
        variant="contained"
        onClick={() => {
          sendMessage(isThreadMessage);
        }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </>
  )
}

export default ChatSend;