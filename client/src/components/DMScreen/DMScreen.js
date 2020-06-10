import React from "react";
import { connect } from "react-redux";

import { Box } from "grommet";

import Map from "../Map/Map";
import Notes from "./components/Notes";
import Music from "./components/Music";

const DMScreen = () => {
  return (
    <Box margin="small">
      <Box direction="row" gap="small">
        <Box gap="small">
          <Notes />
          <Music />
        </Box>
        <Box width="xlarge" height="large" align="center">
          <Map user="DM" />
        </Box>
      </Box>
    </Box>
  );
};

DMScreen.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(DMScreen);
