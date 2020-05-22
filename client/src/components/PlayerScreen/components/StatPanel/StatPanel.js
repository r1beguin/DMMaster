import React from "react";
import { Box, Text } from "grommet";

import HpBox from "./HpBox";

import MainStatBox from "./MainStatBox";
import SavingThrows from "./SavingThrows";
import Inventory from "../Inventory/Inventory";

//Describes base player stats and modifiers

const StatPanel = () => {
  return (
    <Box margin="small" direction="row">
      <Box direction="row" alignContent="center">
        <Box>
          <HpBox />
          <Inventory />
        </Box>

        <Box margin="small" justify="evenly">
          <Box
            background="white"
            width="xsmall"
            height="xxsmall"
            round="small"
            border="all"
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
            border="all"
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
            border="all"
            align="center"
            margin="xxsmall"
          >
            <Text>Speed</Text>
            <Text>30ft</Text>
          </Box>
        </Box>
      </Box>

      <Box direction="row"></Box>

      <Box>
        <MainStatBox />
        <SavingThrows />
      </Box>
    </Box>
  );
};

export default StatPanel;
