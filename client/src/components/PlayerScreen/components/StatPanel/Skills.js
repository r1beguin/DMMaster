import React from "react";

import { Box, Text } from "grommet";

const Skills = ({ skill }) => {
  if (skill === "0") {
    return <Box></Box>;
  } else if (skill === "str") {
    return (
      <Box
        background="white"
        width="small"
        margin="small"
        round="small"
        border="full"
        align="center"
      >
        <Text>Athletics</Text>
        <Text>+2</Text>
      </Box>
    );
  } else if (skill === "dex") {
    return (
      <Box
        background="white"
        width="small"
        margin="small"
        round="small"
        border="full"
        align="center"
      >
        <Text>Acrobatics</Text>
        <Text>+2</Text>

        <Text>Sleight of Hand</Text>
        <Text>+2</Text>

        <Text>Stealth</Text>
        <Text>+2</Text>
      </Box>
    );
  } else if (skill === "int") {
    return (
      <Box
        background="white"
        width="small"
        margin="small"
        round="small"
        border="full"
        align="center"
      >
        <Text>Arcana</Text>
        <Text>+2</Text>

        <Text>History</Text>
        <Text>+2</Text>

        <Text>Investigation</Text>
        <Text>+2</Text>

        <Text>Nature</Text>
        <Text>+2</Text>

        <Text>Religion</Text>
        <Text>+2</Text>
      </Box>
    );
  } else if (skill === "wis") {
    return (
      <Box
        background="white"
        width="small"
        margin="small"
        round="small"
        border="full"
        align="center"
      >
        <Text>Animal handling</Text>
        <Text>+2</Text>

        <Text>Insight</Text>
        <Text>+2</Text>

        <Text>Medicine</Text>
        <Text>+2</Text>

        <Text>Perception</Text>
        <Text>+2</Text>

        <Text>Survival</Text>
        <Text>+2</Text>
      </Box>
    );
  } else if (skill === "cha") {
    return (
      <Box
        background="white"
        width="small"
        margin="small"
        round="small"
        border="full"
        align="center"
      >
        <Text>Deception</Text>
        <Text>+2</Text>

        <Text>Intimidation</Text>
        <Text>+2</Text>

        <Text>Performance</Text>
        <Text>+2</Text>

        <Text>Persuasion</Text>
        <Text>+2</Text>
      </Box>
    );
  } else {
    return <Box></Box>;
  }
};

export default Skills;
