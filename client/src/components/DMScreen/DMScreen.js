
import './DMScreen.css'

import Upload from './components/Upload'
import Draggable from '../../utils/Draggable'
import InitiativeTracker from './components/InitiativeTracker'

import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextTurn } from '../../actions/fight'


const DMScreen = ({ nextTurn, turn, involved }) => {


    return (
        <Fragment>
            
            <div className="dmBox">
                <div className="iniBox">
                    
                    {involved.map(function(inv, idx){
                        const creature = inv.creature;
                        return (<Draggable><a key={idx}><InitiativeTracker active={idx === turn} name={creature.name} src={creature.avatar} /></a></Draggable>)
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