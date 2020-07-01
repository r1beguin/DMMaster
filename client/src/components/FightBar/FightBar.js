import React, {Fragment, useEffect} from "react";
import { connect } from "react-redux";

import { Box } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt
import InitiativeTracker from "../DMScreen/components/InitiativeTracker";
import {FormNext, NewWindow} from "grommet-icons";
import {FormDown} from "grommet-icons";

const FightBar = ({ involved, turn, style, vertical, docked}) => {
  useEffect(() => {
    // loadImageList();
  }, []);

  console.log(style)

  return (
      <Box direction={vertical ? "column" : "row"} basis="full" flex={{shrink: 0, grow: 0}} background="neutral-3">
        {!docked && false && <Box background="blue" basis="xsmall" className="handle" flex={{shrink: 0, grow: 0}}/>}

        <Box
            overflow={{horizontal: vertical ? "visible" : "auto", vertical: vertical ? "auto" : "visible"}}
            direction={vertical ? "column" : "row"}
            margin="auto"
            basis="auto">
          <Box
              direction={vertical ? "column" : "row"}
              pad={{vertical: vertical ? "medium" : "small", horizontal: vertical ?  "medium" : "large"}}
              gap="small"
              basis="auto"
              background=""
              flex={{shrink: 0, grow: 0}}
          >
            {involved.map(function (inv, idx) {
              const creature = inv.creature;
              // TODO: fix "key" warning
              return (
                  <Box gap="small" basis="auto" direction={vertical ? "column" : "row"} flex={{shrink: 0, grow: 0}}>
                    <InitiativeTracker
                        active={idx === turn}
                        name={creature.name}
                        src={creature.avatar}
                    />
                    {idx < involved.length - 1 && <Box justify="center" alignContent="center" direction={vertical ? "row" : "column"}>
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
    {} // connect actions for the component to modify store state
)(FightBar);
