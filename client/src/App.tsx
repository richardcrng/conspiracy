import IndexRoute from './routes/IndexRoute';
import { socket, SocketContext } from './socket';

function App() {

  return (
    <SocketContext.Provider value={socket}>
      <IndexRoute />
    </SocketContext.Provider>
  );
}

export default App;
