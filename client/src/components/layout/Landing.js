import React from "react";
import { Link } from "react-router-dom";

import { Box } from "grommet";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
  return (
    <Box align="center" fill={true} justify="center">
      <Box>
        <Box>
          <Link to="/DMScreen">DMScreen</Link>
        </Box>
        <Box>
          <Link to="/Battlemap">Battlemap</Link>
        </Box>
        <Box>
          <Link to="/PlayerScreen">PlayerScreen</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
