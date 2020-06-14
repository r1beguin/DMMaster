import React, { useEffect } from "react";
import { connect } from "react-redux";

import Draggable from "react-draggable";

import { Box, DropButton, Image, Text, Button } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt

import {
  loadImageList,
  loadActiveImage,
  setActiveImage,
  uploadImage,
} from "../../actions/image";
import FileBase64 from "react-file-base64";
import { getCreature, updatePosition } from "../../actions/hp";

const Map = ({
  hp,
  getCreature,
  image,
  images,
  loadImageList,
  loadActiveImage,
  setActiveImage,
  uploadImage,
  involved,
  turn,
  updatePosition,
  user,
}) => {
  useEffect(() => {
    loadActiveImage();
    loadImageList();
    getCreature("Thokk");
  }, []);

  const handleStop = (e, position, name) => {
    const { x, y } = position;
    console.log(name, x, y);
    updatePosition({
      name: name,
      posx:
        involved.find((inv) => inv.creature.name === name).creature.posx + x,
      posy:
        involved.find((inv) => inv.creature.name === name).creature.posy + y,
    });
  };

  return (
    <Box
      fill
      border={{ color: "grey", size: "small" }}
      round="small"
      align="center"
    >
      <Box fill="horizontal" align="end">
        {user === "DM" && (
          <Box width="xsmall" margin="xsmall" gap="small">
            <DropButton
              label="Maps"
              color="grey"
              dropContent={
                <Box align="center">
                  {images.map((img) => (
                    <Box
                      key={img.name}
                      border={{ color: "accent-2" }}
                      width="xsmall"
                      height="xsmall"
                      margin="xsmall"
                      onClick={() => setActiveImage(img)}
                    >
                      <Image src={img.data} fit="cover"></Image>
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
        )}
      </Box>
      <Box direction="row" justify="evenly">
        <Box gap="small" margin="small">
          {involved.map((inv) => (
            <Draggable
              onStop={(e, position) =>
                handleStop(e, position, inv.creature.name)
              }
              position={{ x: inv.creature.posx, y: inv.creature.posy }}
            >
              <Box
                width="xxsmall"
                height="xxsmall"
                round="full"
                overflow="hidden"
              >
                <Image src={inv.creature.avatar} fit="cover" />
              </Box>
            </Draggable>
          ))}
        </Box>
        <Box width="large" pad="xsmall" align="center">
          {image === "" ? (
            <Text>Aucune battlemap chargée</Text>
          ) : (
            <Image src={image} fit="contain"></Image>
          )}
        </Box>
      </Box>
    </Box>
  );
};

Map.propTypes = {
  image: PropTypes.string,
  // loadImage: PropTypes.func,
  images: PropTypes.array,
  loadImageList: PropTypes.func,
  loadActiveImage: PropTypes.func,
  setActiveImage: PropTypes.func,
  uploadImage: PropTypes.func,
  involved: PropTypes.array,
  hp: PropTypes.object,
  getCreature: PropTypes.func,
  turn: PropTypes.number,
  updatePosition: PropTypes.func,
  user: PropTypes.string,
};

const mapStateToProps = (state) => ({
  image: state.image.data,
  images: state.image.imageList,
  involved: state.fight.involved,
  hp: state.hp,
  turn: state.fight.turn,
});

export default connect(
  mapStateToProps, // connect store state to component props
  {
    loadImageList,
    loadActiveImage,
    setActiveImage,
    uploadImage,
    getCreature,
    updatePosition,
  } // connect actions for the component to modify store state
)(Map);
