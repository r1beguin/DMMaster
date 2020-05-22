import React from "react";

import { Box, Text, Layer, Button } from "grommet";

const Inventory = () => {
  const [showInventory, setShowInventory] = React.useState(false);

  const [stuff] = React.useState([
    {
      name: "Equipement",
      content: [
        {
          name: "Breastplate",
        },
        {
          name: "Breastplate",
        },
        {
          name: "Breastplate",
        },
        {
          name: "Breastplate",
        },
      ],
    },
    {
      name: "Misc",
      content: [
        {
          name: "Glassblower kit",
        },
        {
          name: "Glassblower kit",
        },
        {
          name: "Glassblower kit",
        },
      ],
    },
  ]);

  return (
    <Box>
      <Button
        label="Inventory"
        onClick={() => setShowInventory(true)}
        color="black"
        round="small"
      />
      {showInventory && (
        <Layer
          onEsc={() => setShowInventory(false)}
          onClickOutside={() => setShowInventory(false)}
          position="top-left"
          margin={{ top: "xlarge", left: "small" }}
        >
          <Box align="center" width="small">
            <Text>Inventory</Text>
            {stuff.map((category) => (
              <Box margin="small">
                <Text weight="bold">{category.name}</Text>
                {category.content.map((item) => (
                  <Text>{item.name}</Text>
                ))}
              </Box>
            ))}
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Inventory;
