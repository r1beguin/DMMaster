import React from "react";
import { Box } from "grommet";
import Map from "../Map/Map";
import Notes from "../DMScreen/components/Notes";

const PlayerScreen = () => {
  return (
    <Box>
      <Box direction="row">
        <Notes />
        <Box width="xlarge" height="large">
          <Map user="player" />
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerScreen;
