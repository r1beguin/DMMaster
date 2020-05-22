import React from "react";
import { Box, Text } from "grommet";

const Traits = () => {
  const [traits] = React.useState([
    {
      name: "Class features",
    },
    {
      name: "Race Feature",
    },
    {
      name: "Feats",
    },
  ]);
  return (
    <Box margin="small" fill>
      <Text>Traits</Text>
      {traits.map((trait) => (
        <Box margin="small" key={trait.name}>
          <Text>{trait.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Traits;
