import { useEffect } from 'react';
import { io } from "socket.io-client";
import { SocketEvent, JoinEvent } from './types/event.types';

const socket = io('localhost:4000')
socket.on("hello", (arg) => {
  console.log(arg); // world
});

function App() {

  useEffect(() => {
    fetch('http://localhost:4000').then(res => res.json()).then(data => {
      console.log('from backend:', data)
    })
  })

  const handleJoin = () => {
    const data: JoinEvent = {
      playerName: 'Richard'
    }
    socket.emit(SocketEvent.JOIN, data)
  }

  return (
    <>
      <h1>Conspiracy</h1>
      <input />
      <button onClick={handleJoin}>Join game</button>
    </>
  );
}

export default App;
