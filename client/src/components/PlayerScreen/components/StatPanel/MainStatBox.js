import React from "react";
import { Box, Text, Button, Drop } from "grommet";

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
  ]);

  const ref = React.useRef();
  const [show, setShow] = React.useState(false);

  return (
    <Box direction="row" gap="small" margin="small">
      {skills.map((skill) => (
        <Box>
          <Button
            label={
              <Box>
                <Text>{skill.name}</Text>
                <Text>{skill.base}</Text>
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
                    <Text>{sub.name}</Text>
                    <Text>{sub.base}</Text>
                  </Box>
                ))}
              </Box>
            </Drop>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MainStatBox;
