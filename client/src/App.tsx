import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import useMobileVH from "./hooks/useMobileVH";
import HostNewRoute from "./routes/HostNewRoute";
import IndexRoute from "./routes/IndexRoute";
import LobbyIdRoute from "./routes/LobbyIdRoute";
import { PATHS } from "./routes/paths";
import GameIdRoute from "./routes/GameIdRoute";

function App(): JSX.Element {
  useMobileVH();

  return (
    <Router>
      {/* <ToastContainer autoClose={3000} draggablePercent={30} /> */}
      <AppBackground>
        <AppContainer>
          <Switch>
            <Route exact path={PATHS.hostNew} component={HostNewRoute} />
            <Route exact path={PATHS.lobbyId} component={LobbyIdRoute} />
            <Route exact path={PATHS.gameId} component={GameIdRoute} />
            <Route path={PATHS.index} component={IndexRoute} />
          </Switch>
        </AppContainer>
      </AppBackground>
    </Router>
  );
}

const AppBackground = styled.div.attrs({
  className: "h-viewport w-[100vw]",
})`
  padding: 10px;
  background-image: url("/assets/images/illuminati.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div.attrs({
  className: "h-app w-app rounded-lg",
})`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px;
`;

export default App;
