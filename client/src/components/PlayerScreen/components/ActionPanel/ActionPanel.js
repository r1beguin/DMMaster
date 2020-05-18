import React from "react";
import { Box, Text, CheckBox } from "grommet";

const ActionPanel = () => {
  const [attacks, setAttacks] = React.useState([
    {
      name: "Weapons and unarmed",
      content: [
        {
          name: "Shortsword",
          notes: "1d20+7 to hit, 1d6+4 damage",
        },
        {
          name: "Unarmed",
          notes: "1d20+3 to hit, 1d4+4 damage",
        },
      ],
    },
    {
      name: "habilities",
      content: [
        {
          name: "Sneak attack",
          notes:
            "Ad 4d6 to damage when you have advandage, when you're hidden or when an ally is engaged with the enemy.",
        },
      ],
    },
  ]);

  const [spells, setSpells] = React.useState([
    {
      name: "Fireball",
      notes: "wizard go boom",
    },
    {
      name: "Fireball",
      notes: "wizard go boom",
    },
    {
      name: "Fireball",
      notes: "wizard go boom",
    },
  ]);

  return (
    <Box border="all" margin="small" round="small" align="center">
      <Box margin="small" align="center">
        <Text size="small">Action</Text>
        <Box direction="row" justify="evenly">
          <Box margin="small" align="center">
            <Text size="small">Attack</Text>
            {attacks.map((attack) => (
              <Box fill margin="small">
                <Text size="small" weight="bold">
                  {attack.name}
                </Text>
                <Box margin="small">
                  {attack.content.map((item) => (
                    <Box margin="small" width="medium">
                      <Text size="small">{item.name}</Text>
                      <Text size="small">{item.notes}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <Box margin="small" align="center">
            <Text size="small">Spells</Text>
            <Box>
              <Box direction="row" fill justify="between" gap="small">
                <Box direction="row" gap="small">
                  <Text size="small">1st levels</Text>
                  <Box direction="row">
                    <CheckBox></CheckBox>
                    <CheckBox></CheckBox>
                    <CheckBox></CheckBox>
                  </Box>
                </Box>
                <Box direction="row" gap="small">
                  <Text size="small">2st levels</Text>
                  <Box direction="row">
                    <CheckBox></CheckBox>
                    <CheckBox></CheckBox>
                  </Box>
                </Box>
                <Box direction="row" gap="small">
                  <Text size="small">3st levels</Text>
                  <Box direction="row">
                    <CheckBox></CheckBox>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              {spells.map((item) => (
                <Box margin="small" width="medium">
                  <Text size="small">{item.name}</Text>
                  <Text size="small">{item.notes}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActionPanel;
