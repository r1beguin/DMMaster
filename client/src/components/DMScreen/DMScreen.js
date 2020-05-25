import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Map from "../Map/Map";
import Notes from "./components/Notes";
import Music from "./components/Music";

const DMScreen = () => {
  return (
    <Box margin="small">
      <Box direction="row">
        <Box>
          <Notes />
          <Music />
        </Box>
        <Map user="DM" />
      </Box>
    </Box>
  );
};

DMScreen.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(DMScreen);
