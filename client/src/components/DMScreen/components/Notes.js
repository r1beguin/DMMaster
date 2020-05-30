import React from "react";

import { Box, Text, TextArea, Button } from "grommet";

import { Add } from "grommet-icons";

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

  React.useEffect(() => {
    console.log(notes);
  }, [notes]);
  return (
    <Box border={{ color: "grey", size: "small" }} round="small" align="center">
      <Text>Notes</Text>
      <Box margin="small" direction="row" gap="small">
        <Box gap="small">
          {notes.map((note) => (
            <Box
              width="small"
              border="all"
              round="xsmall"
              pad="small"
              onClick={() => setActiveNote(note.index)}
            >
              <Text size="xsmall">{note.name}</Text>
            </Box>
          ))}
        </Box>
        <Box height="medium">
          <TextArea
            value={notes[activeNote].content}
            size="small"
            onChange={(e) => {
              let newArr = [...notes]; // copying the old datas array
              newArr[activeNote].content = e.target.value; // replace e.target.value with whatever you want to change it to

              setNotes(newArr); // ??
            }}
          ></TextArea>
        </Box>
      </Box>
      <Box alignSelf="end" margin="small">
        <Button
          icon={<Add />}
          label="Add a note"
          color="grey"
          onClick={() => {
            let newIndex = notes.length;
            setNotes([
              ...notes,
              {
                name: "newNote",
                index: newIndex,
                content: "",
              },
            ]);
          }}
        ></Button>
      </Box>
    </Box>
  );
};

export default Notes;
