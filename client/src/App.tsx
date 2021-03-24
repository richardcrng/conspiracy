import { useEffect } from 'react';
import { io } from "socket.io-client";

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

  return (
    <p>Conspiracy</p>
  );
}

export default App;
