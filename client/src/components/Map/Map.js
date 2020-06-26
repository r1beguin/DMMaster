import React, { useEffect } from "react";
import { connect } from "react-redux";

import Draggable from "react-draggable";

import { Box, DropButton, Image, Text } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt

import {
  loadImageList,
  loadActiveImage,
  setActiveImage,
  uploadImage,
} from "../../actions/image";
import FileBase64 from "react-file-base64";
import { getCreature, updatePosition } from "../../actions/fight";
import CreatureToken from "../common/CreatureToken";

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
    getCreature("Thokk"); // why usefull here ?
  }, []);

  const handleStop = (e, position, id) => {
    const { x, y } = position;
    updatePosition({
      id: id,
      posx: x,
      posy: y,
    });
  };

  const draggableTokens = involved.map(i=> {
    return {
      position: {
        x: i.creature.posx,
        y: i.creature.posy
      },
      involved: i
    }
  })

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
                      <Image src={img.data} fit="cover"/>
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
          {draggableTokens.map((token) => (
            <Draggable
              onStop={(e, position) => {
                token.position.x = position.x
                token.position.y = position.y
                handleStop(e, position, token.involved.creature._id)
              }}
              // TODO: possible sync issue for attributes of attrivutes ?
              position={token.position}
            >
              <div>{/*This div is needed for Draggable*/}
                <CreatureToken image={token.involved.creature.avatar} />
              </div>
            </Draggable>
          ))}
        </Box>
        <Box width="large" pad="xsmall" align="center">
          {image === "" ? (
            <Text>Aucune battlemap chargée</Text>
          ) : (
            <Image src={image} fit="contain"/>
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
