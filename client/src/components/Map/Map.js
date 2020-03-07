import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, DropButton, Image, Text } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt

import { loadImageList, loadImage, uploadImage } from "../../actions/image";
import FileBase64 from "react-file-base64";

const Map = ({ image, images, loadImage, loadImageList, uploadImage }) => {
  useEffect(() => {
    loadImageList();
  }, []);
  return (
    <Box fill border={{ color: "brand", size: "large" }}>
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
                <Box margin="xsmall" direction="row" alignContent="center">
                  <Box alignContent="center">
                    <FileBase64
                      multiple={false}
                      onDone={uploadImage.bind(this)}
                    />
                  </Box>
                </Box>
              </Box>
            }
          />
        </Box>
      </Box>
      <Box fill pad="xsmall">
        {image === "" ? (
          <Text>Selectionner votre battlemap</Text>
        ) : (
          <Image src={image} fit="contain"></Image>
        )}
      </Box>
    </Box>
  );
};

Map.propTypes = {
  image: PropTypes.object,
  loadImage: PropTypes.func,
  images: PropTypes.array,
  loadImageList: PropTypes.func,
  uploadImage: PropTypes.func
};

const mapStateToProps = state => ({
  image: state.image.data,
  images: state.image.imageList
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage, loadImageList, uploadImage } // connect actions for the component to modify store state
)(Map);
