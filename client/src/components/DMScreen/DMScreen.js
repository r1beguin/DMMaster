import "./DMScreen.css";

import Draggable from "react-draggable";
import InitiativeTracker from "./components/InitiativeTracker";
import Map from "../Map/Map";

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextTurn, loadFight } from "../../actions/fight";
import { Box } from "grommet";

const DMScreen = ({ loadFight, nextTurn, turn, involved }) => {
  const [formData, setFormData] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    controlledPosition: {
      x: -400,
      y: 200
    }
  });

  const onStart = () => {
    setFormData({ ...formData, activeDrags: ++formData.activeDrags });
  };

  const onStop = () => {
    setFormData({ ...formData, activeDrags: --formData.activeDrags });
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <Fragment>
      <div className="dmBox">
        <Box direction="row">
          <div className="iniBox">
            {involved.map(function(inv, idx) {
              const creature = inv.creature;
              return (
                <Draggable {...dragHandlers}>
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
            <div className="turnbox">
              <button className="turn" onClick={e => nextTurn()}>
                End of Turn
              </button>
            </div>
          </div>

          <Map />
        </Box>
      </div>
    </Fragment>
  );
};

DMScreen.propTypes = {
  loadFight: PropTypes.func.isRequired,
  nextTurn: PropTypes.func.isRequired, // ptfr
  turn: PropTypes.number,
  involved: PropTypes.array
};

const mapStateToProps = state => ({
  turn: state.fight.turn,
  involved: state.fight.involved
});

export default connect(mapStateToProps, { loadFight, nextTurn })(DMScreen);
