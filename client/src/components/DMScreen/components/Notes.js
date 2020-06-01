import React from "react";

import { Box, Text, TextArea, Button } from "grommet";

import { Add, Edit, Checkmark } from "grommet-icons";

const Notes = () => {
  const [notes, setNotes] = React.useState([
    {
      name: "perso",
      index: 0,
      content: "This is a note.",
      edit: false,
    },
    {
      name: "story",
      index: 1,
      content: "This is also a note.",
      edit: false,
    },
  ]);
  const [activeNote, setActiveNote] = React.useState(0);

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
              background={note.index === activeNote && "brand"}
            >
              {note.edit ? (
                <Box justify="between" direction="row">
                  <TextArea
                    size="xsmall"
                    alignSelf="center"
                    onChange={(e) => {
                      setActiveNote(note.index);

                      let newArr = [...notes]; // copying the old datas array
                      newArr[note.index].name = e.target.value; // replace e.target.value with whatever you want to change it to

                      setNotes(newArr); // ??
                    }}
                  />
                  <Button
                    alignSelf="center"
                    icon={<Checkmark size="small" />}
                    onClick={() => {
                      let newArr = [...notes]; // copying the old datas array
                      newArr[note.index].edit = false; // replace e.target.value with whatever you want to change it to

                      setNotes(newArr); // ??
                    }}
                  />
                </Box>
              ) : (
                <Box justify="between" direction="row">
                  <Text size="xsmall" alignSelf="center">
                    {note.name}
                  </Text>
                  <Button
                    alignSelf="center"
                    icon={<Edit size="small" />}
                    onClick={() => {
                      console.log(note.index);
                      setActiveNote(note.index);
                      let newArr = [...notes]; // copying the old datas array
                      newArr[note.index].edit = true; // replace e.target.value with whatever you want to change it to

                      setNotes(newArr); // ??
                    }}
                  />
                </Box>
              )}
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
                edit: false,
              },
            ]);
          }}
        ></Button>
      </Box>
    </Box>
  );
};

export default Notes;
