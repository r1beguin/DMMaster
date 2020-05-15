import React from "react";
import { Box, Text } from "grommet";

import HpBox from "./HpBox";

import MainStatBox from "./MainStatBox";
import SavingThrows from "./SavingThrows";

//Describes base player stats and modifiers

const StatPanel = () => {
  return (
    <Box margin="small">
      <Box direction="row" alignContent="center">
        <HpBox />
        <Box margin="small">
          <Box
            background="white"
            width="xsmall"
            height="xxsmall"
            round="small"
            border="solid"
            align="center"
            margin="xxsmall"
          >
            <Text>AC</Text>
            <Text>15</Text>
          </Box>
          <Box
            background="white"
            width="xsmall"
            height="xxsmall"
            round="small"
            border="solid"
            align="center"
            margin="xxsmall"
          >
            <Text>Initiative</Text>
            <Text>+2</Text>
          </Box>
          <Box
            background="white"
            width="xsmall"
            height="xxsmall"
            round="small"
            border="solid"
            align="center"
            margin="xxsmall"
          >
            <Text>Speed</Text>
            <Text>30ft</Text>
          </Box>
        </Box>
      </Box>

      <Box direction="row"></Box>

      <MainStatBox />
      <SavingThrows />
    </Box>
  );
};

export default StatPanel;
