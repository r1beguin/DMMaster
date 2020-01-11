import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

//redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  // same effect as 'componentDidMount' but for a function
  // the [] make it so that it does not run indefinitely 
  useEffect(() => {
    store.dispatch(loadUser())
    document.title = "DM Master"
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/">
            <Landing />
          </Route>
          <section className="container">
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
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
