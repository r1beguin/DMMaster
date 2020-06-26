import React from "react";

import master from "../../images/master.svg";
import battlemap from "../../images/battlemap.svg";
import character from "../../images/character.svg";

import {Box, Image} from "grommet";
import {Link} from "react-router-dom";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
  return (
    <Box align="center" height={{ min: "80vh" }} justify="center">
      <Box align="center" justify="center" gap="small" width="small">

        <Link to="/DMScreen">
          <Box
            align="center"
            justify="center"
            border="solid"
            round="small"
            pad="small"
            fill
            hoverIndicator
          >
            <Box height="xxsmall" width="xxsmall" overflow="hidden">
              <Image src={master} color="blue" fit="cover" />
            </Box>
            DM Screen
          </Box>
        </Link>

        <Link to="/Battlemap">
          <Box
            align="center"
            justify="center"
            border="solid"
            round="small"
            pad="small"
            fill
            hoverIndicator
          >
            <Box height="xxsmall" width="xxsmall" overflow="hidden">
              <Image src={battlemap} fit="cover" />
            </Box>
            Battlemap
          </Box>
        </Link>
        <Link to="/PlayerScreen">
          <Box
            align="center"
            justify="center"
            border="solid"
            round="small"
            pad="small"
            fill
            hoverIndicator
          >
            <Box height="xxsmall" width="xxsmall" overflow="hidden">
              <Image src={character} fit="cover" />
            </Box>
            Player Screen
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Landing;
