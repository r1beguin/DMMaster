import React from "react";
import { Box, Text, Tabs, Tab, TextArea } from "grommet";

const Notes = () => {
  const [notes, setNotes] = React.useState([
    {
      name: "note 1",
      index: 1,
      content:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    },
    {
      name: "note 2",
      index: 2,
      content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      name: "note 3",
      index: 3,
      content: "Lorem Ipsum Lorem Ipsum",
    },
  ]);
  return (
    <Box margin="small" fill>
      <Text>Notes</Text>
      <Box overflow="scroll">
        <Tabs>
          {notes.map((note) => (
            <Tab
              key={note.index}
              label={
                <Box border round="small" pad="small" margin="small">
                  <Text size="small">{note.name}</Text>
                </Box>
              }
            >
              {console.log(notes)}
              <Box margin="small">
                <TextArea
                  value={note.content}
                  onChange={(e) => {
                    let newNotes = [...notes];
                    newNotes[note.index].content = e.target.value;
                    setNotes(newNotes);
                  }}
                />
              </Box>
            </Tab>
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default Notes;
