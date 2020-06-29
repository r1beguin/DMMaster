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
  })

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

  const imgRef = React.useRef(null)
  const zppRef = React.useRef(null)

  const [scale, setScale] = React.useState(1)

  const updateSize = (forceReset = false) => {
    const img = imgRef.current
    const wrapper = zppRef.current.wrapperRef.current
    const state = zppRef.current.context.state

    const currentScale = state.scale
    const currentMinScale = state.options.minScale
    const currentX = state.positionX
    const currentY = state.positionY

    const newMinScale = Math.min(wrapper.offsetWidth / img.clientWidth, wrapper.offsetHeight / img.clientHeight)

    const changeRatio = newMinScale / currentMinScale

    const newScale = forceReset ? newMinScale : (currentScale * changeRatio)
    setScale(newScale)

    const widthDiff = wrapper.offsetWidth - img.clientWidth * newScale
    const heightDiff = wrapper.offsetHeight - img.clientHeight * newScale

    const newX = widthDiff >= 0 || forceReset ? widthDiff/2 : Math.min(0, currentX * changeRatio)
    const newY = heightDiff >=0 || forceReset ? heightDiff/2 : Math.min(0, currentY * changeRatio)

    zppRef.current.context.state.options.minScale = newMinScale
    if (forceReset) {
      setTimeout(zppRef.current.context.dispatch.setTransform.bind(null, newX, newY, newScale, 0), 10)
    } else {
      zppRef.current.context.dispatch.setTransform(newX, newY, newScale, 0)
    }
  }

  return (
      <TransformWrapper onZoomChange={(state)=>{setScale(state.scale)}} options={{centerContent: false}} wheel={{step: 200}} pan={{disabled: false}}>
        <TransformComponent ref={zppRef}>
          <div>
            <img style={{objectFit: "none"}} onLoad={() => updateSize(true)} src={image} ref={imgRef} />
          </div>
          <div
              style={{position: "absolute", width: "25px", height: "25px", top:0}}
              onMouseDown={(e) => {e.stopPropagation()}}
              onTouchStart={(e) => {e.stopPropagation()}}
              onTouchMove={(e) => {e.stopPropagation()}}
          >
            {draggableTokens.map((token, i) => (
                <Draggable
                    scale={scale}
                    onStop={(e, position) => {
                      console.log(scale)
                      token.position.x = position.x
                      token.position.y = position.y
                      handleStop(e, position, token.involved.creature._id)
                    }}
                    // TODO: possible sync issue for attributes of attrivutes ?
                    position={token.position}
                >
                  <div>{/*This div is needed for Draggable*/}
                    <div>
                      <CreatureToken className="map-token" image={token.involved.creature.avatar} size={25} /></div>
                  </div>
                </Draggable>
            ))}
          </div>
        </TransformComponent>
        <ReactResizeDetector handleWidth handleHeight onResize={(w,h) => {
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
/*
<div style={{position: "absolute"}}>
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
        <div>{/*This div is needed for Draggable}
          <CreatureToken className="map-token" image={token.involved.creature.avatar} size={25} />
        </div>
      </Draggable>
  ))}</div>*/
