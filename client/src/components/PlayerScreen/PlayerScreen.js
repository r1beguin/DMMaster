import React from "react";
import { Box } from "grommet";
import StatPanel from "./components/StatPanel/StatPanel";
import ActionPanel from "./components/ActionPanel/ActionPanel";

const PlayerScreen = () => {
  return (
    <Box>
      <StatPanel />
      <ActionPanel />
    </Box>
  );
};

export default PlayerScreen;
