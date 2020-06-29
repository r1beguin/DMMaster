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
    }, []);

    const [imgSize, setImgSize] = React.useState({width: "0px", height: "0px"})
    const [scale, setScale] = React.useState(1)
    const [transform, setTransform] = React.useState("initial")

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

    return <Box fill={true} style={{position: "relative", overflow: "hidden"}}>
        <MovableMap image={image} onTransform={setTransform} onScaleChange={setScale} onImgLoad={setImgSize}/>
        <div
            style={{transformOrigin: "0% 0%", position: "absolute", ...imgSize, pointerEvents: "none", transform: transform}}
        >
            {draggableTokens.map((token) => (
                <Draggable
                    scale={scale}
                    onStop={(e, position) => {
                        token.position.x = position.x
                        token.position.y = position.y
                        handleStop(e, position, token.involved.creature._id)
                    }}
                    position={token.position}
                >
                    <div style={{pointerEvents: "all", display: "inline-block", position: "absolute"}}>
                        <CreatureToken image={token.involved.creature.avatar} size={25} />
                    </div>
                </Draggable>
            ))}
        </div>
    </Box>

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


class MovableMap extends React.PureComponent {

    constructor(props) {
        super(props);
        this.zppRef = React.createRef()
        this.imgRef = React.createRef()
        this.state = {
            scale: 1
        }
    }

/*    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("state", nextState, "props", nextProps)
        return true
    }*/

    componentDidMount() {
        // Listen for map panning to move tokens accordingly
        new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                this.props.onTransform(this.zppRef.current.contentRef.current.style.transform)
            }.bind(this));
        }.bind(this)).observe(this.zppRef.current.contentRef.current, { attributes : true, attributeFilter : ['style'] });
    }

    render() {
        console.log("rendering map")
        // Methods

        /** Triggered on image load or container size change */
        const updateSize = (onLoad = false) => {

            const img = this.imgRef.current
            const wrapper = this.zppRef.current.wrapperRef.current
            const state = this.zppRef.current.context.state

            // Get current scales and positions
            const currentScale = state.scale
            const currentMinScale = state.options.minScale
            const currentX = state.positionX
            const currentY = state.positionY

            // Calculate new min scale to fin map in screen
            const newMinScale = Math.min(wrapper.offsetWidth / img.clientWidth, wrapper.offsetHeight / img.clientHeight)

            // Calculate ratio of size change to keep a level of zoom relative to the one the user had before
            const changeRatio = newMinScale / currentMinScale

            // Calc new scale
            const newScale = onLoad ? newMinScale : (currentScale * changeRatio)
            this.props.onScaleChange(newScale)

            // Position the map properly manually since for some reason react-zoom-pan-pinch won't do it unles you click on it
            const widthDiff = wrapper.offsetWidth - img.clientWidth * newScale
            const heightDiff = wrapper.offsetHeight - img.clientHeight * newScale

            const newX = widthDiff >= 0 || onLoad ? widthDiff/2 : Math.min(0, currentX * changeRatio)
            const newY = heightDiff >=0 || onLoad ? heightDiff/2 : Math.min(0, currentY * changeRatio)

            // Set values
            this.zppRef.current.context.state.options.minScale = newMinScale
            if (onLoad) {
                // On first load a small timeout is needed for some reason
                setTimeout(this.zppRef.current.context.dispatch.setTransform.bind(null, newX, newY, newScale, 0), 50)
                this.props.onImgLoad({width: img.clientWidth, height: img.clientHeight})
            } else {
                this.zppRef.current.context.dispatch.setTransform(newX, newY, newScale, 0)
            }
        }

        return (
            <TransformWrapper onZoomChange={(state)=>{this.props.onScaleChange(state.scale)}} options={{centerContent: false}} wheel={{step: 200}} pan={{disabled: false}}>
                <TransformComponent ref={this.zppRef}>
                    <div>
                        <img style={{objectFit: "none"}} onLoad={() => updateSize(true)} src={this.props.image} ref={this.imgRef} />
                    </div>
                </TransformComponent>
                <ReactResizeDetector handleWidth handleHeight onResize={() => {
                    updateSize()
                }} />
            </TransformWrapper>
        );    }
}