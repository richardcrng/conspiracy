import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import withPlayerNameGuard from "./hoc/withPlayerNameGuard";
import useSocketListener from "./hooks/useSocketListener";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/game/:gameId"
          component={withPlayerNameGuard(GameRoute)}
        />
        <Route path="/" component={IndexRoute} />
      </Switch>
    </Router>
  );
}

export default App;
