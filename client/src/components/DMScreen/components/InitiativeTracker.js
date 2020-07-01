import React from "react";
import {Box, Image, Text} from "grommet";

const InitiativeTracker = ({ name, active, src }) => {

  return (
    <Box justify="center" alignContent="center" round="xsmall" overflow="hidden" basis="auto" flex={{shrink: 0, grow: 0}} background={active ? "neutral-1" : "neutral-2"}>
      <Box
        width="xxsmall"
        height="xxsmall"
        overflow="hidden"
        basis="xxsmall"
        flex={{shrink:0, grow: 0}}
      >
        <Image fit="cover" alt="portrait" src={src} />
      </Box>
        <Box basis="auto" pad="xsmall"><Text weight="bold" size="xsmall" textAlign="center">{name}</Text></Box>
    </Box>
  );
};

export default InitiativeTracker;
