import React from "react";

import master from "../../images/master.svg";
import battlemap from "../../images/battlemap.svg";
import character from "../../images/character.svg";

import {Box, Image} from "grommet";
import {Link} from "react-router-dom";
import LandingButton from "./LandingButton";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
  return (
      <Box direction="row-responsive" gap="large" fill="true" pad="large">
        <LandingButton to="/DMScreen" text="DM Screen" image={master} />
        <LandingButton to="/Battlemap" text="Battle Map" image={battlemap} />
        <LandingButton to="/PlayerScreen" text="Player Screen" image={character} />
      </Box>
  );
};

export default Landing;
