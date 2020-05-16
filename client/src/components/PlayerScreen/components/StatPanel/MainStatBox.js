import React from "react";
import { Box, Text, Button, Drop } from "grommet";

const StatBox = ({ skill }) => {
  const ref = React.useRef();
  const [show, setShow] = React.useState(false);

  return (
    <Box margin="small">
      <Button
        label={
          <Box align="center">
            <Text size="small">{skill.name}</Text>
            <Text size="small">{skill.base}</Text>
          </Box>
        }
        color="white"
        ref={ref}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        onFocus={() => {}}
        onBlur={() => {}}
      />

      {ref.current && show && (
        <Drop align={{ top: "bottom" }} target={ref.current} plain>
          <Box
            margin="small"
            pad="small"
            background="dark-3"
            round="small"
            align="center"
          >
            {skill.subs.map((sub) => (
              <Box align="center">
                <Text size="small">{sub.name}</Text>
                <Text size="small">{sub.base}</Text>
              </Box>
            ))}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const MainStatBox = () => {
  const [skills] = React.useState([
    { name: "Strength", base: "+2", subs: [{ name: "Athletics", base: "+2" }] },
    {
      name: "Dexterity",
      base: "+2",
      subs: [
        { name: "Acrobatics", base: "+2" },
        { name: "Sleight of Hand", base: "+2" },
        { name: "Stealth", base: "+2" },
      ],
    },
    {
      name: "Constitution",
      base: "+2",
      subs: [{ name: "No sub skill", base: "" }],
    },
    {
      name: "Intelligence",
      base: "+2",
      subs: [
        { name: "Arcana", base: "+2" },
        { name: "History", base: "+2" },
        { name: "Investigation", base: "+2" },
        { name: "Nature", base: "+2" },
        { name: "Religion", base: "+2" },
      ],
    },
    {
      name: "Wisdom",
      base: "+2",
      subs: [
        { name: "Animal handling", base: "+2" },
        { name: "Insight", base: "+2" },
        { name: "Medicine", base: "+2" },
        { name: "Perception", base: "+2" },
        { name: "Survival", base: "+2" },
      ],
    },
    {
      name: "Charisma",
      base: "+2",
      subs: [
        { name: "Deception", base: "+2" },
        { name: "Intimidation", base: "+2" },
        { name: "Performance", base: "+2" },
        { name: "Persuasion", base: "+2" },
      ],
    },
  ]);

  return (
    <Box
      margin={{ vertical: "small" }}
      border="all"
      round="small"
      pad="small"
      width="large"
    >
      <Text>Skills</Text>
      <Box direction="row">
        {skills.map((skill) => (
          <StatBox skill={skill} />
        ))}
      </Box>
    </Box>
  );
};

export default MainStatBox;
