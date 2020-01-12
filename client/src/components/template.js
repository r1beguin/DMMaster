
/**
 * This is a teplate file to remember how to use react and redux correctly
 */
 
import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { action1 } from "../../actions/action1";
import PropTypes from "prop-types"; // shortcut: impt

// setAlert destructured from props (passed by the connect)
const functionalComponent = ({ action1, propValue, propConditional1, propConditional2 }) => {

  // local state definition with hooks
  const [formData, setFormData] = useState({
    attribute1: propValue,
    attribute2: 1
  });
  // state destructuraion into variables
  const { attribute1, attribute2 } = formData;

  // handler for internal state
  const onChange = e => {
    // this is a generic function for awywhere in the Fragment, 
    // so long as the target namme is the same as the attribute
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handler for state actions
  const onSubmit = async e => {
    e.preventDefault();
    action1({ attribute1 }); // can be an async action
    setFormData({ ...formData, attribute2: attribute2 +1 })
  };

  // display part in the return 

  // simple redirect
  if (propConditional1) {
    return <Redirect to="/"/>
  }

  // everithing displayed should be put in a Fragment
  // can display directly with the local state like value={attribute1}
  // normal conditional display with props
  return (
    <Fragment>
      {propConditional2 && <div>conditional div</div>}
      <p>sum: {attribute1 + attribute2}</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="attr 1"
            name="attribute1"
            value={attribute1}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" value="add some" />
      </form>
    </Fragment>
  );
};

// both actions and states are now used as props 
functionalComponent.propTypes = {
  action1: PropTypes.func.isRequired, // ptfr
  propValue: PropTypes.value,
  propConditional1: PropTypes.bool,   // ptb
  propConditional2: PropTypes.bool,
};

// extract the props we are interested in from the store
const mapStateToProps = state => ({
  propValue: state.subReducer1.propValue, 
  propConditional1: state.subReducer1.propConditional, 
  propConditional2: state.subReducer2.propConditional
});

// funtion used to connect store and component both ways
export default connect(
  mapStateToProps, // connect store state to component props
  { action1 } // connect actions for the component to modify store state
)(functionalComponent); // component exported

/**
 * When creating a new state reducer "temp": 
 *  - in action/type.js: add the action names
 *  - in reducers/temp.js: create inital state and function that goes (current_state, action) => new_state
 *  - in action/temp.js: export the "higer level" function goes ftemp(params) => dispatch({ACTION, sth optional})
 *  - in reducer/index.js: add temp to combineReducers
 *  
 *  you can now import ftemp as a prop in a component with conect
 *  you can import temp attributes as a prop in component with mapStateToProps and connect
 */