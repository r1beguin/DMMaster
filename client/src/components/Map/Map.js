import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, DropButton, Image } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt

import { loadImageList, loadImage } from "../../actions/image";

const Map = ({ image, images, loadImage, loadImageList }) => {
  useEffect(() => {
    loadImageList();
  }, []);
  return (
    <Box
      width="large"
      height="large"
      border={{ color: "brand", size: "large" }}
    >
      <Box fill="horizontal" align="end">
        <Box width="xsmall" margin="xsmall">
          <DropButton
            label="Maps"
            dropContent={
              <Box align="center">
                {images.map(img => (
                  <Box
                    border={{ color: "accent-2" }}
                    width="xsmall"
                    height="xsmall"
                    margin="xsmall"
                    onClick={() => loadImage(img)}
                  >
                    <Image src={img.imageData} fit="cover"></Image>
                  </Box>
                ))}
              </Box>
            }
          />
        </Box>
      </Box>
      <Box fill>
        <Image src={image} fit="cover"></Image>
      </Box>
    </Box>
  );
};

Map.propTypes = {
  image: PropTypes.object,
  loadImage: PropTypes.func,
  images: PropTypes.array,
  loadImageList: PropTypes.func
};

const mapStateToProps = state => ({
  image: state.image.data,
  images: state.image.imageList
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage, loadImageList } // connect actions for the component to modify store state
)(Map);