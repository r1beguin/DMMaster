import React from "react";
import { Box, Text } from "grommet";

import Skills from "./Skills";

const MainStatBox = () => {
  const [skill, setskill] = React.useState({
    str: "+2",
    dex: "+2",
    con: "+2",
    int: "+2",
    wis: "+2",
    cha: "+2",
    skill: "",
  });

  const SkillDisplay = (e) => {
    if (e === "str" && skill.skill !== "str") {
      setskill({ ...skill, skill: "str" });
    } else if (e === "dex" && skill.skill !== "dex") {
      setskill({ ...skill, skill: "dex" });
    } else if (e === "int" && skill.skill !== "int") {
      setskill({ ...skill, skill: "int" });
    } else if (e === "wis" && skill.skill !== "wis") {
      setskill({ ...skill, skill: "wis" });
    } else if (e === "cha" && skill.skill !== "cha") {
      setskill({ ...skill, skill: "cha" });
    } else {
      setskill({ ...skill, skill: "0" });
    }
  };

  return (
    <Box>
      <Box direction="row">
        <Box
          onClick={() => SkillDisplay("str")}
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Strength</Text>

          <Text> {skill.str}</Text>
        </Box>

        <Box
          onClick={() => SkillDisplay("dex")}
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Dexterity</Text>

          <Text> {skill.dex}</Text>
        </Box>

        <Box
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Constitution</Text>

          <Text> {skill.con}</Text>
        </Box>

        <Box
          onClick={() => SkillDisplay("int")}
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Intelligence</Text>

          <Text>{skill.int}</Text>
        </Box>

        <Box
          onClick={() => SkillDisplay("wis")}
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Wisdom</Text>

          <Text>{skill.wis}</Text>
        </Box>

        <Box
          onClick={() => SkillDisplay("cha")}
          background="white"
          width="small"
          margin="small"
          round="small"
          border="full"
          align="center"
        >
          <Text>Charisma</Text>

          <Text>{skill.cha}</Text>
        </Box>
      </Box>

      <Box>
        <Skills skill={skill.skill} />
      </Box>
    </Box>
  );
};

export default MainStatBox;
