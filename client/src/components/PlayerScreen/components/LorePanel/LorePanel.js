import React from "react";
import { Box, Text, Tabs, Tab } from "grommet";

import Traits from "./Traits";
import Backstory from "./Backstory";
import Notes from "./Notes";

const LorePanel = () => {
  return (
    <Box align="center" width="large" height="large">
      <Text>Lore</Text>
      <Box fill>
        <Tabs>
          <Tab
            label={
              <Box border round="small" pad="small" margin="small">
                <Text size="small">Traits</Text>
              </Box>
            }
          >
            <Traits />
          </Tab>
          <Tab
            label={
              <Box border round="small" pad="small" margin="small">
                <Text size="small">Backstory</Text>
              </Box>
            }
          >
            <Backstory />
          </Tab>
          <Tab
            label={
              <Box border round="small" pad="small" margin="small">
                <Text size="small">Notes</Text>
              </Box>
            }
          >
            <Notes />
          </Tab>
        </Tabs>
      </Box>
    </Box>
  );
};

export default LorePanel;
