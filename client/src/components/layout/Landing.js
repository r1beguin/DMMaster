import React from "react";
import { Link } from "react-router-dom";

import { Box } from "grommet";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
  return (
    <section className="landing">
      <Box align="center">
        <Link to="/DMScreen">DMScreen</Link>

        <Link to="/Battlemap">Battlemap</Link>

        <Link to="/PlayerScreen">PlayerScreen</Link>
      </Box>
    </section>
  );
};

export default Landing;
