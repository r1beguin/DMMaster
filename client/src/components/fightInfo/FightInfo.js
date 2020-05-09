
import InitiativeTracker from './components/InitiativeTracker'

import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextTurn, loadFight } from '../../actions/fight'


const DMScreen = ({ loadFight, nextTurn, turn, involved }) => {

    useEffect(() => {
        loadFight();
    },[]);

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
    loadFight: PropTypes.func.isRequired,
    nextTurn: PropTypes.func.isRequired, // ptfr
    turn: PropTypes.number,
    involved: PropTypes.array,
};

const mapStateToProps = state => ({
    turn: state.fight.turn,
    involved: state.fight.involved, 
});

export default connect(mapStateToProps, { loadFight, nextTurn })(DMScreen);