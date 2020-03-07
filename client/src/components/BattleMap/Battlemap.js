import { loadImage } from "../../actions/image";
import React, { Fragment } from "react";
import "./Battlemap.css";
import { connect } from "react-redux";
import Map from "../Map/Map";

const Battlemap = ({ image }) => {
  return (
    <Fragment>
      <Map />
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
