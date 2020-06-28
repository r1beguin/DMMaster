import React, { useEffect } from "react";
import { connect } from "react-redux";

import Draggable from "react-draggable";

import ReactResizeDetector from 'react-resize-detector';

import {Anchor, Box, DropButton, Image, Text} from "grommet";
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

import './Map.css'
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

const Map = ({
  hp,
  getCreature,
  image,
  loadImageList,
  loadActiveImage,
  involved,
  turn,
  updatePosition,
  user
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

  const ref = React.createRef()
  const ref2 = React.createRef()

  const updateSize = (forceReset = false) => {
    const img = ref.current
    const wrapper = ref2.current.wrapperRef.current
    const state = ref2.current.context.state

    const currentScale = state.scale
    const currentMinScale = state.options.minScale
    const currentX = state.positionX
    const currentY = state.positionY

    const newMinScale = Math.min(wrapper.offsetWidth / img.clientWidth, wrapper.offsetHeight / img.clientHeight)

    const changeRatio = newMinScale / currentMinScale

    const newScale = forceReset ? newMinScale : (currentScale * changeRatio)

    const widthDiff = wrapper.offsetWidth - img.clientWidth * newScale
    const heightDiff = wrapper.offsetHeight - img.clientHeight * newScale

    const newX = widthDiff >= 0 || forceReset ? widthDiff/2 : Math.min(0, currentX * changeRatio)
    const newY = heightDiff >=0 || forceReset ? heightDiff/2 : Math.min(0, currentY * changeRatio)

    ref2.current.context.state.options.minScale = newMinScale
    if (forceReset) {
      setTimeout(ref2.current.context.dispatch.setTransform.bind(null, newX, newY, newScale, 0), 10)
    } else {
      ref2.current.context.dispatch.setTransform(newX, newY, newScale, 0)
    }
  }

  return (
      <TransformWrapper options={{centerContent: false}} wheel={{step: 200}} pan={{disabled: false}}>
        <TransformComponent ref={ref2}>
          <div>
            {draggableTokens.map((token) => (
                <Draggable disabled={true}
                    onStop={(e, position) => {
                      token.position.x = position.x
                      token.position.y = position.y
                      handleStop(e, position, token.involved.creature._id)
                    }}
                    // TODO: possible sync issue for attributes of attrivutes ?
                    position={token.position}
                >
                  <div>{/*This div is needed for Draggable*/}
                    <CreatureToken className="map-token" image={token.involved.creature.avatar} size={25} />
                  </div>
                </Draggable>
            ))}
            <img style={{objectFit: "none"}} onLoad={() => updateSize(true)} src={image} ref={ref} />
          </div>
        </TransformComponent>
        <ReactResizeDetector handleWidth handleHeight skipOnMount={false} onResize={(w,h) => {
          updateSize()
        }} />
      </TransformWrapper>

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

  /*<div justify="center">
{image === "" ? (
<Text>Aucune battlemap chargée</Text>
) : (
<Image src={image} fit="contain"/>
)}
{/*draggableTokens.map((token) => (
<Draggable
onStop={(e, position) => {
token.position.x = position.x
token.position.y = position.y
handleStop(e, position, token.involved.creature._id)
}}
// TODO: possible sync issue for attributes of attrivutes ?
position={token.position}
>
<div>{/*This div is needed for Draggable*//*}
<CreatureToken className="token" image={token.involved.creature.avatar} />
</div>
</Draggable>
))*//*}*/
