import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, DropButton, Image, Text } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt

import { loadImageList, loadImage, uploadImage } from "../../actions/image";
import FileBase64 from "react-file-base64";
import { getCreature } from "../../actions/hp";

const Map = ({
  hp,
  getCreature,
  image,
  images,
  loadImage,
  loadImageList,
  uploadImage,
  involved
}) => {
  useEffect(() => {
    loadImageList();
    getCreature("Thokk");
    console.log("hp", hp);
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
                    key={img.imageName}
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
                      onDone={(uploadImage.bind(this), loadImageList())}
                    />
                  </Box>
                </Box>
              </Box>
            }
          />
        </Box>
      </Box>
      <Box direction="row">
        <Box round="full" width="xxsmall" height="xxsmall" margin="xsmall">
          <Image
            src={hp.creature.avatar}
            fit="cover"
            style={{ borderRadius: 100 }}
          ></Image>
        </Box>
        <Box fill pad="xsmall" align="center">
          {image === "" ? (
            <Text>Selectionner votre battlemap</Text>
          ) : (
            <Image src={image} fit="contain"></Image>
          )}
        </Box>
      </Box>
    </Box>
  );
};

Map.propTypes = {
  image: PropTypes.object,
  loadImage: PropTypes.func,
  images: PropTypes.array,
  loadImageList: PropTypes.func,
  uploadImage: PropTypes.func,
  involved: PropTypes.array,
  hp: PropTypes.object,
  getCreature: PropTypes.func
};

const mapStateToProps = state => ({
  image: state.image.data,
  images: state.image.imageList,
  involved: state.fight.involved,
  hp: state.hp
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage, loadImageList, uploadImage, getCreature } // connect actions for the component to modify store state
)(Map);
