import React from "react";
import { Box, Text } from "grommet";

const Backstory = () => {
  const [back] = React.useState([
    {
      name: "Background",
    },
    {
      name: "Alignement",
    },
    {
      name: "Appearance",
    },
  ]);
  return (
    <Box margin="small" fill>
      <Text>Backstory</Text>
      {back.map((trait) => (
        <Box margin="small" key={trait.name}>
          <Text>{trait.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Backstory;
