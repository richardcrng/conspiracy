import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";
import { socket, SocketContext } from "./socket";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route exact path='/game/:gameId' component={GameRoute} />
          <Route path='/' component={IndexRoute} />
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
