import React from "react";
import { Box, Text } from "grommet";

const SavingThrows = () => {
  const [savings, setSavings] = React.useState([
    { name: "Strength", value: "+4" },
    { name: "Dexteriry", value: "+0" },
    { name: "Intelligence", value: "+2" },
    { name: "Constitution", value: "-1" },
    { name: "Wisdom", value: "+3" },
    { name: "Charisma", value: "+2" },
  ]);

  return (
    <Box pad="small" border="all" round="small">
      <Text>Saving Throws</Text>
      <Box
        margin="small"
        direction="row"
        gap="small"
        pad="small"
        align="center"
        fill
      >
        {savings.map((save) => (
          <Box background="white" round="small" pad="small" border="all">
            <Text size="small">{save.name}</Text>
            <Text size="small">{save.value}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SavingThrows;
