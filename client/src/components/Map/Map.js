import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Box, DropButton, Image, Text, Button } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt
import InitiativeTracker from "../../components/DMScreen/components/InitiativeTracker";

import { loadImageList, loadImage, uploadImage } from "../../actions/image";
import FileBase64 from "react-file-base64";
import { getCreature, updatePosition } from "../../actions/hp";

import Draggable from "react-draggable";

const Map = ({
  hp,
  getCreature,
  image,
  images,
  loadImage,
  loadImageList,
  uploadImage,
  involved,
  turn,
  updatePosition,
}) => {
  useEffect(() => {
    loadImageList();
    getCreature("Thokk");
  }, []);

  const [formData, setFormData] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: hp.creature.posx,
      y: hp.creature.posy,
    },
  });

  const onStart = () => {
    setFormData({ ...formData, activeDrags: ++formData.activeDrags });
  };

  const onStop = () => {
    setFormData({ ...formData, activeDrags: --formData.activeDrags });
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setFormData({ ...formData, controlledPosition: { x, y } });
  };

  return (
    <Box fill border={{ color: "brand", size: "large" }}>
      <Box fill="horizontal" align="end">
        <Box width="xsmall" margin="xsmall">
          <DropButton
            label="Maps"
            dropContent={
              <Box align="center">
                {images.map((img) => (
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
                      onDone={uploadImage.bind(this)}
                    />
                  </Box>
                </Box>
              </Box>
            }
          />
          <Button
            onClick={() => {
              updatePosition("Thokk", { posx: 300, posy: 300 });
              getCreature("Thokk");
              console.log(hp);
            }}
            label="test"
          ></Button>
        </Box>
      </Box>
      <Box direction="row">
        <Box round="full" width="xxsmall" height="xxsmall" margin="xsmall">
          {involved.map(function (inv, idx) {
            const creature = inv.creature;
            return (
              <Draggable
                key={idx}
                {...dragHandlers}
                position={formData.controlledPosition}
                onDrag={onControlledDrag}
              >
                <div key={idx}>
                  <InitiativeTracker
                    active={idx === turn}
                    name={creature.name}
                    src={creature.avatar}
                  />
                </div>
              </Draggable>
            );
          })}
        </Box>
        <Box width="large" pad="xsmall" align="center">
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
  image: PropTypes.string,
  loadImage: PropTypes.func,
  images: PropTypes.array,
  loadImageList: PropTypes.func,
  uploadImage: PropTypes.func,
  involved: PropTypes.array,
  hp: PropTypes.object,
  getCreature: PropTypes.func,
  turn: PropTypes.number,
  updatePosition: PropTypes.func,
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
  { loadImage, loadImageList, uploadImage, getCreature, updatePosition } // connect actions for the component to modify store state
)(Map);
