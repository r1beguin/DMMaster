import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grommet } from "grommet";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
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

  return (
    <Provider store={store}>
      <Router>
        <Grommet plain>
          <Navbar />
          <Route exact path="/">
            <Landing />
          </Route>

          <Alert />
          <Switch>
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
          </Switch>
        </Grommet>
      </Router>
    </Provider>
  );
};

export default App;
