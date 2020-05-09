import React from "react";
import { Box, Text } from "grommet";
import HpManager from "./HpManager";

//Hit points display managment

const HpBox = () => {
  const [maxHp] = React.useState(55);

  return (
    <Box
      background="white"
      width="small"
      margin="small"
      round="small"
      border="full"
      align="center"
    >
      <Text>Hit points</Text>

      <Box>
        <HpManager />
      </Box>
      <Box>{maxHp}</Box>
    </Box>
  );
};

export default HpBox;
