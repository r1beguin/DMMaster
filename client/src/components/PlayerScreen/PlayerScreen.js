import React from "react";
import { Box } from "grommet";
import Map from "../Map/Map";
import Notes from "../DMScreen/components/Notes";
import Battlemap from "../BattleMap/Battlemap";

const PlayerScreen = () => {
  return (
    <Box>
      <Box direction="row" gap="small" margin={{ horizontal: "small" }}>
        <Notes />
        <Box width="xlarge" height="large">
          <Battlemap user="player" />
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerScreen;
