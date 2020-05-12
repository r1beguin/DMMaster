import React from "react";
import { Box, Text, TextInput } from "grommet";
import { Add, Subtract } from "grommet-icons";
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

      <Box direction="row" margin="small" gap="small" alignContent="center">
        <Box alignSelf="center">
          <Add />
        </Box>
        <Box alignSelf="center" width="xxsmall">
          <TextInput />
        </Box>
        <Box alignSelf="center">
          <Subtract />
        </Box>
      </Box>
    </Box>
  );
};

export default HpBox;
