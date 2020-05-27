import React from "react";

import { Box, Text, TextInput } from "grommet";

const Notes = () => {
  const [notes, setNotes] = React.useState([
    {
      name: "perso",
      index: 0,
      content: "This is a note.",
    },
    {
      name: "story",
      index: 1,
      content: "This is also a note.",
    },
  ]);
  const [activeNote, setActiveNote] = React.useState(0);
  return (
    <Box margin="small" border="all" round="small" align="center" pad="small">
      <Text>Notes</Text>
      <Box margin="small" direction="row" gap="small">
        <Box gap="small">
          {notes.map((note) => (
            <Box
              border="all"
              color="grey"
              round="xsmall"
              pad="small"
              onClick={() => setActiveNote(note.index)}
            >
              <Text size="xsmall">{note.name}</Text>
            </Box>
          ))}
        </Box>
        <Box>
          <TextInput
            value={notes[activeNote].content}
            onChange={(e) => {
              let newArr = [...notes]; // copying the old datas array
              newArr[activeNote].content = e.target.value; // replace e.target.value with whatever you want to change it to

              setNotes(newArr); // ??
            }}
          ></TextInput>
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
