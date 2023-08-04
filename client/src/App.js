import { useState } from 'react';
import ChatWindow from './Components/ChatWindow';
import './index.scss';
import io from 'socket.io-client';
import ChatJoin from './Components/ChatJoin';
import { createContext } from 'react';

export const UserContext = createContext('');

const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState('');
  
  return (
    <div className='App'>
      <UserContext.Provider value={userName}>  
        {!userName ? (
          <ChatJoin
            socket={socket}
            setUserName={setUserName}
          />
        ) : (  
          <ChatWindow socket={socket} />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
