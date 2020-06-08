import React from "react";
import PropTypes from "prop-types"; // shortcut: impt
import { connect } from "react-redux";
import { Box, Text, TextArea, Button } from "grommet";

import {
  Add,
  Edit,
  Checkmark,
  Previous,
  Next,
  Trash,
  Save,
} from "grommet-icons";

import { getNotes, setNotes, setBuffer } from "../../../actions/notes";

const Notes = ({ notes, getNotes, setNotes, user, setBuffer }) => {
  const [newNotes, setNewNotes] = React.useState([]);
  const [activeNote, setActiveNote] = React.useState(0);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    getNotes({ name: "Thokk" });
  }, []);

  React.useState(() => {
    setNewNotes(notes);
    console.log(newNotes, notes, activeNote);
  }, [notes]);

  const onSetNotes = (data) => {
    setNotes({ name: user.name, data: data });
  };

  return (
    <Box border={{ color: "grey", size: "small" }} round="small" align="center">
      <Box>
        {!collapsed ? (
          <Box direction="row" margin={{ horizontal: "small" }}>
            <Box
              alignSelf="center"
              width="medium"
              margin={{ horizontal: "small" }}
            >
              <Text>Notes</Text>
            </Box>
            <Box margin={{ horizontal: "small" }}>
              <Button icon={<Previous />} onClick={() => setCollapsed(true)} />
            </Box>
          </Box>
        ) : (
          <Box margin={{ horizontal: "small" }} alignSelf="end">
            <Button icon={<Next />} onClick={() => setCollapsed(false)} />
          </Box>
        )}
      </Box>
      <Box margin="small" direction="row" gap="small">
        {!collapsed && (
          <Box gap="small">
            {notes.map((note) => (
              <Box
                width="small"
                border="all"
                round="xsmall"
                pad="small"
                onClick={() => setActiveNote(note.index)}
                key={note.index}
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

                        onSetNotes(newArr); // ??
                      }}
                    />
                    <Box align="center">
                      <Button
                        icon={<Checkmark size="small" />}
                        onClick={() => {
                          let newArr = [...notes]; // copying the old datas array
                          newArr[note.index].edit = false; // replace e.target.value with whatever you want to change it to

                          onSetNotes(newArr); // ??
                        }}
                      />
                      <Button
                        icon={<Trash size="small" />}
                        onClick={() => {
                          let newArr = [...notes];
                          newArr.splice(note.index, 1);
                          onSetNotes(newArr);
                        }}
                      />
                    </Box>
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
                        setActiveNote(note.index);
                        let newArr = [...notes]; // copying the old datas array
                        newArr[note.index].edit = true; // replace e.target.value with whatever you want to change it to

                        onSetNotes(newArr); // ??
                      }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
        {!collapsed && (
          <Box height="medium">
            <TextArea
              value={notes[activeNote].content}
              size="small"
              onChange={(e) => {
                let newArr = [...notes]; // copying the old datas array
                newArr[activeNote].content = e.target.value; // replace e.target.value with whatever you want to change it to

                setBuffer(newArr); // ??
              }}
            ></TextArea>
          </Box>
        )}
      </Box>
      {!collapsed && (
        <Box alignSelf="end" margin="small" direction="row" gap="small">
          <Button icon={<Save />} onClick={() => onSetNotes(notes)} />
          <Button
            icon={<Add />}
            label="Add a note"
            color="grey"
            onClick={() => {
              let newIndex = notes.length;
              onSetNotes([
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
      )}
    </Box>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  getNotes: PropTypes.func,
  setNotes: PropTypes.func,
  setBuffer: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  notes: state.notes.data,
  user: state.auth.user,
});

export default connect(
  mapStateToProps, // connect store state to component pro  ps
  { getNotes, setNotes, setBuffer } // connect actions for the component to modify store state
)(Notes);
