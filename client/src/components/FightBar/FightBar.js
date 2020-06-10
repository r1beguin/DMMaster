import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box } from "grommet";
import PropTypes from "prop-types"; // shortcut: impt
import InitiativeTracker from "../DMScreen/components/InitiativeTracker";

const FightBar = ({ involved, turn }) => {
  useEffect(() => {
    // loadImageList();
  }, []);
  return (
    <Box
      height="xsmall"
      border={{ color: "grey", size: "small" }}
      round="small"
      direction="row"
      margin="small"
      pad="small"
    >
      {involved.map(function (inv, idx) {
        const creature = inv.creature;
        // TODO: fix "key" warning
        return (
          <Box direction="row">
            <Box>
              <a key={idx}>
                <InitiativeTracker
                  active={idx === turn}
                  name={creature.name}
                  src={creature.avatar}
                />
              </a>
            </Box>
            <Box>
              <p>→</p>
            </Box>
          </Box>
        );
      })}
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
