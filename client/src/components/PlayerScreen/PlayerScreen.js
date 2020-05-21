import React from "react";
import { Box, DropButton } from "grommet";
import StatPanel from "./components/StatPanel/StatPanel";
import ActionPanel from "./components/ActionPanel/ActionPanel";
import Map from "../Map/Map";
import LorePanel from "./components/LorePanel/LorePanel";

const PlayerScreen = () => {
  return (
    <Box>
      <StatPanel />
      <Box direction="row" gap="small">
        <ActionPanel />
        <Box height="small">
          <DropButton
            color="black"
            dropAlign={{ top: "bottom" }}
            label="Map"
            dropContent={<Map />}
          />
        </Box>
        <Box height="small">
          <DropButton
            color="black"
            dropAlign={{ top: "bottom" }}
            label="Lore"
            dropContent={<LorePanel />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerScreen;
