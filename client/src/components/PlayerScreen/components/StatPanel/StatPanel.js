import React from "react";
import { Box, Text } from "grommet";

import HpBox from "./HpBox";

import MainStatBox from "./MainStatBox";

//Describes base player stats and modifiers

const StatPanel = () => {
  return (
    <Box margin="small">
      <Box direction="row" alignContent="center">
        <HpBox />
        <Box
          background="white"
          width="xxsmall"
          height="xxsmall"
          round="small"
          border="solid"
          align="center"
          margin={{ vertical: "small" }}
        >
          <Text>AC</Text>
          <Text>15</Text>
        </Box>
      </Box>

      <Box direction="row">
        <Box
          background="white"
          width="small"
          margin="small"
          round="small"
          border="solid"
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
