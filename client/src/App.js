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

socketAPI(`http://${window.location.hostname}:5000`, store);

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
      },
      elevation: {
        dark: {
          none: 'none',
          // You can override the values for box-shadow here.
          xsmall: '0px 2px 2px rgba(0, 0, 0, 0.40)',
          small: '0px 4px 4px rgba(0, 0, 0, 0.40)',
          medium: '0px 6px 8px rgba(0, 0, 0, 0.40)',
          large: '0px 8px 16px rgba(0, 0, 0, 0.40)',
          xlarge: '0px 12px 24px rgba(0, 0, 0, 0.40)',
        }
      }
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Grommet theme={grommetTheme}>
          <Login />
          <Box fill="true" direction="column" background="#333">
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
