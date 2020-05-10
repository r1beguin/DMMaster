import React from "react";
import { Box, Image } from "grommet";

const InitiativeTracker = ({ name, active, src }) => {
  const activeCurrent = {
    border: "solid red",
  };

  return (
    <Box>
      <Box
        width="xxsmall"
        height="xxsmall"
        round="full"
        overflow="hidden"
        style={active ? activeCurrent : null}
      >
        <Image fit="cover" alt="portrait" src={src} />
      </Box>
      <Box>{name}</Box>
    </Box>
  );
};

export default InitiativeTracker;
