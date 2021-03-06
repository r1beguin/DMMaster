import { loadImage } from "../../actions/image";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import Map from "../Map/Map";
import { Box } from "grommet";

const Battlemap = ({ image }) => {
  return (
    <Fragment>
      <Box margin="xsmall" width="xlarge" height="large">
        <Map user="battlemap" />
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  image: state.image.data,
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage } // connect actions for the component to modify store state
)(Battlemap);
