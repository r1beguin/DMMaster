
import './DMScreen.css'

import Upload from './components/Upload'
import Draggable from 'react-draggable';
import InitiativeTracker from './components/InitiativeTracker'

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextTurn } from '../../actions/fight'


const DMScreen = ({ nextTurn, turn, involved }) => {

    const [formData,setFormData] = useState({
        activeDrags: 0,
        deltaPosition: {
        x: 0, y: 0
        },
        controlledPosition: {
        x: -400, y: 200
        }
      })

      const onStart = () => {
        setFormData({...formData,activeDrags: ++formData.activeDrags});
      };
    
      const onStop = () => {
        setFormData({...formData, activeDrags: --formData.activeDrags});
      };

      const dragHandlers = {onStart: onStart, onStop: onStop};
    return (
        <Fragment>
            
            <div className="dmBox">
                <div className="iniBox">
                    
                    {involved.map(function(inv, idx){
                        const creature = inv.creature;
                        return (<Draggable {...dragHandlers}><div key={idx}><InitiativeTracker active={idx === turn} name={creature.name} src={creature.avatar} /></div></Draggable>)
                    })}
                    <div className="turnbox" >
                        <button className="turn" onClick={e =>  nextTurn()}>End of Turn</button>
                    </div>
                    
                </div>
                <Upload />
            </div>
                
        </Fragment>
    );
};

DMScreen.propTypes = {
    nextTurn: PropTypes.func.isRequired, // ptfr
    turn: PropTypes.value,
    involved: PropTypes.array,
};

const mapStateToProps = state => ({
    turn: state.fight.turn,
    involved: state.fight.involved, 
});

export default connect(mapStateToProps, { nextTurn })(DMScreen);