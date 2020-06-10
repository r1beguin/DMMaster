import React from "react";
import { Box, Text } from "grommet";

import HpBox from "./HpBox";

import MainStatBox from "./MainStatBox";

//Describes base player stats and modifiers

const StatPanel = () => {
  return (
    <Box margin="small">
      <HpBox />

      <Box direction="row">
        <Box
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>AC</Text>
          <Text>15</Text>
        </Box>

        <Box
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Initiative</Text>
          <Text>+2</Text>
        </Box>
      </Box>

      <MainStatBox />
    </Box>
  );
};

export default StatPanel;
