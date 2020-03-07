import { loadImage } from "../../actions/image";
import React, { Fragment } from "react";
import "./Battlemap.css";
import { connect } from "react-redux";
import Map from "../Map/Map";
import { Box } from "grommet";

const Battlemap = ({ image }) => {
  return (
    <Fragment>
      <Box height="50vw" margin="xsmall">
        <Map />
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  image: state.image.data
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage } // connect actions for the component to modify store state
)(Battlemap);
