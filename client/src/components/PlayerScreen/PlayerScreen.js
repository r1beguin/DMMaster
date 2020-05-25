import React from "react";
import { Box } from "grommet";
import Map from "../Map/Map";
import Notes from "../DMScreen/components/Notes";

const PlayerScreen = () => {
  return (
    <Box>
      <Box direction="row">
        <Notes />
        <Map />
      </Box>
    </Box>
  );
};

export default PlayerScreen;
