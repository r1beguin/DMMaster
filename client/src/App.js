import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Box, grommet, Grommet, Main, Stack} from "grommet";
import {deepMerge} from "grommet/utils";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import FightBar from "./components/FightBar/FightBar";
import Landing from "./components/Landing/Landing";
import DMScreen from "./components/DMScreen/DMScreen";
import Battlemap from "./components/BattleMap/Battlemap";
import PlayerScreen from "./components/PlayerScreen/PlayerScreen";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { loadFight } from "./actions/fight";
import socketAPI from "./socket-api";
//redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

socketAPI("http://localhost:5000", store);

const App = () => {
  // same effect as 'componentDidMount' but for a function
  // the [] make it so that it does not run indefinitely
  useEffect(() => {
    document.title = "DM Master";

    store.dispatch(loadUser());
    store.dispatch(loadFight());
  }, []);

  const grommetTheme = deepMerge(grommet, {
    global: {
      font: {
        family: "Arial"
      }
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Grommet theme={grommetTheme} full="true">
          <Login />
          <Box fill="true" direction="column">
          <Navbar />
          <Switch>
            <Main fill="true" flex="true">
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/DMScreen">
                <DMScreen />
              </Route>
              <Route exact path="/Battlemap">
                <Battlemap />
              </Route>
              <Route exact path="/PlayerScreen">
                <PlayerScreen />
              </Route>
            </Main>
          </Switch>
            <Alert />
          </Box>
        </Grommet>
      </Router>
    </Provider>
  );
};

export default App;
