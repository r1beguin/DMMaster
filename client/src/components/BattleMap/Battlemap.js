import { loadImage } from "../../actions/image";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import Map from "../Map/Map";
import { Box } from "grommet";
import FightBar from "../FightBar/FightBar";
import Draggable from "react-draggable";

const Battlemap = ({ dockedTo, verticalUndocked }) => {

    const directions = ["row-reverse", "column-reverse", "row", "column", "column"]
    const vertical = [true, false, true, false, verticalUndocked]

    const unDockedStyle = {
        position: "absolute", maxHeight: "80%", maxWidth: "80%"
    }
    const barStyle = {
        zIndex: 4,
        overflow: "hidden"
    }

    let style
    if (dockedTo < 4 ) {
        style = {...barStyle}
    } else {
        style = {...unDockedStyle, ...barStyle}
    }

    return (
        <Box fill={true} direction={directions[dockedTo]} style={{position: "relative", overflow: "hidden"}}>
            <Map />
            {<Draggable bounds="parent"
                       handle=".handle">
                <Box style={style} elevation="small" direction="row" flex={{shrink: 0, grow: 1}} round={dockedTo < 4 ? "0" : "xsmall"}>
                    <FightBar vertical={vertical[dockedTo]} docked={dockedTo < 4} />
                </Box>
            </Draggable>}
        </Box>
    );
};

const mapStateToProps = state => {
    if(state.settings) {
        return ({
            dockedTo: state.settings.fightbarDocking,
            verticalUndocked: state.settings.fightbarVertical,
        })
    } else {
        return ({
            dockedTo: 1,
            verticalUndocked: false
        })
    }
}

export default connect(
    mapStateToProps, // connect store state to component props
    { loadImage } // connect actions for the component to modify store state
)(Battlemap);
