import React from "react";

import master from "../../images/master.svg";
import battlemap from "../../images/battlemap.svg";
import character from "../../images/character.svg";

import { Box, Anchor, Image } from "grommet";

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
  return (
    <Box align="center" height={{ min: "80vh" }} justify="center">
      <Box align="center" justify="center" gap="small" width="small">
        <Box
          align="center"
          justify="center"
          border="solid"
          round="small"
          pad="small"
          onClick={() => {
            location.href = "/DMScreen";
          }}
          fill
          hoverIndicator
        >
          <Box height="xxsmall" width="xxsmall" overflow="hidden">
            <Image src={master} color="blue" fit="cover" />
          </Box>
          <Anchor href="/DMScreen">DMScreen</Anchor>
        </Box>
        <Box
          align="center"
          justify="center"
          border="solid"
          round="small"
          pad="small"
          onClick={() => {
            location.href = "/Battlemap";
          }}
          fill
          hoverIndicator
        >
          <Box height="xxsmall" width="xxsmall" overflow="hidden">
            <Image src={battlemap} fit="cover" />
          </Box>
          <Anchor href="/Battlemap">Battlemap</Anchor>
        </Box>
        <Box
          align="center"
          justify="center"
          border="solid"
          round="small"
          pad="small"
          onClick={() => {
            location.href = "/PlayerScreen";
          }}
          fill
          hoverIndicator
        >
          <Box height="xxsmall" width="xxsmall" overflow="hidden">
            <Image src={character} fit="cover" />
          </Box>
          <Anchor href="/PlayerScreen">PlayerScreen</Anchor>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
