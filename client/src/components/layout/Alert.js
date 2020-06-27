import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Box, Main} from "grommet";

import './Alert.css'

// alert destructured from props (passed by the connect)
const Alert = ({ alerts }) => {

      // typical jsx conditional component: condition && map component
      // when mapping: needs unique key
      // classname alows for color to change according to the type
    const alertsDisplay = alerts !== null && alerts.length > 0 &&
        alerts.map(alert => (
            <Box fill={true} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </Box>
        ))
      return <Box className="alert-wrapper" justify="end" direction="column">{alertsDisplay}</Box>
};


// good practice to specify this 
Alert.propTypes = {
  alerts: PropTypes.array.isRequired //ptfr
};

// part where the store state is linked to the prop of the component
const mapStateToProps = state => ({
  alerts: state.alert
});

// everytime connect is used, this is how the module should be exported
export default connect(mapStateToProps)(Alert);
