import { useEffect } from 'react';
import { io } from "socket.io-client";
import { SocketEvent, CreateGameEvent, GameCreatedEvent } from './types/event.types';

const socket = io('localhost:4000')

function App() {

  useEffect(() => {
    socket.on(SocketEvent.GAME_CREATED, (data: GameCreatedEvent) => {
      console.log('created game!', data)
    })
  }, [socket])

  const handleNewGame = () => {
    const data: CreateGameEvent = {
      playerName: 'Richard',
      socketId: socket.id
    }
    socket.emit(SocketEvent.CREATE_GAME, data)
  }

  return (
    <>
      <h1>Conspiracy</h1>
      <input />
      <button onClick={handleNewGame}>New game</button>
      <button>Join game</button>
    </>
  );
}

export default App;
