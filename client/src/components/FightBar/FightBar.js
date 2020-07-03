import React, {Fragment, useEffect} from "react";
import { connect } from "react-redux";

import {Box, Button, ResponsiveContext} from "grommet";
import PropTypes from "prop-types"; // shortcut: impt
import InitiativeTracker from "../DMScreen/components/InitiativeTracker";
import {Drag, FormNext, NewWindow} from "grommet-icons";
import {FormDown} from "grommet-icons";
import Draggable from "react-draggable";
import {nextTurn} from "../../actions/fight";
import {ChapterNext} from "grommet-icons/icons";

const FightBar = ({ involved, turn, vertical, docked, nextTurn}) => {
    useEffect(() => {
        // loadImageList();
    }, []);

    const size = React.useContext(ResponsiveContext);

    return (
        <Box direction={vertical ? "column" : "row"} basis="full" flex={{shrink: 0, grow: 0}} background="neutral-3">
            <Box
                background="rgba(0,0,0,0.5)"
                direction={vertical ? "column": "row"}
                gap="small"
                basis="auto"
                flex={{shrink: 0, grow: 0}}
                pad="small">
                {!docked &&
                <Box
                    justify="center"
                    direction={vertical ? "row": "column"}
                    className="handle"
                    style={{cursor: "grab"}}
                    flex={{shrink: 0, grow: 0}}>
                    <Drag opacity="0.5" color="black" style={vertical ? {transform: "rotate(90deg)"} : {}}/>
                    <Drag opacity="0.5" color="black" style={vertical ? {transform: "rotate(90deg)"} : {}}/>
                </Box>}

                <Box
                    justify="center"
                    align="center"
                    flex={{shrink: 0, grow: 0}}
                    focusIndicator={false}
                    onClick={nextTurn}>
                    <ChapterNext opacity="0.5" color="black"/>
                </Box>
            </Box>

            <Box
                className="no-scrollbar"
                overflow={{horizontal: vertical ? "visible" : "auto", vertical: vertical ? "auto" : "visible"}}
                direction={vertical ? "column" : "row"}
                margin="auto"
                basis="auto">
                <Box
                    direction={vertical ? "column" : "row"}
                    pad={{vertical: vertical ? "medium" : "small", horizontal: vertical ?  "medium" : "large"}}
                    basis="auto"
                    background=""
                    flex={{shrink: 0, grow: 0}}
                >
                    {involved.map(function (inv, idx) {
                        const creature = inv.creature;
                        // TODO: fix "key" warning
                        return (
                            <Box key={"maptoken"+inv.creature._id}
                                 basis="auto"
                                 gap={size === "small" && !vertical ? "xsmall" : "small"}
                                 direction={vertical ? "column" : "row"}
                                 flex={{shrink: 0, grow: 0}}>
                                <InitiativeTracker
                                    margin={vertical ? {top: "small"} : {left: "small"}}
                                    active={idx === turn}
                                    name={creature.name}
                                    src={creature.avatar}
                                />
                                {idx < involved.length - 1 && <Box justify="center" direction={vertical ? "row" : "column"}>
                                    {!vertical && <FormNext/> || vertical && <FormDown/>}
                                </Box>}
                            </Box>
                        );
                    })}
                    {/*onUndock && <Box align="end"><NewWindow onClick={onUndock}/></Box>*/}
                </Box>
            </Box>
        </Box>
    );
};

Map.propTypes = {
    involved: PropTypes.array,
    turn: PropTypes.number,
};

const mapStateToProps = (state) => ({
    involved: state.fight.involved,
    turn: state.fight.turn,
});

export default connect(
    mapStateToProps, // connect store state to component pro  ps
    {nextTurn} // connect actions for the component to modify store state
)(FightBar);
