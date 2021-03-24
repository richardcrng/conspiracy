import { useEffect } from 'react';

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
