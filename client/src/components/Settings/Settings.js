import React from "react";
import { connect } from "react-redux";

import {Box, Text, Button, Layer, ResponsiveContext, Anchor, Select} from "grommet";

import { login } from "../../actions/auth";
import {HIDE_SETTINGS_MODAL, UPDATE_SETTINGS, UPDATE_FIGHTBAR_ORIENTATION} from "../../actions/types";
import {bindActionCreators} from "redux";
import {Close,} from "grommet-icons";
import {updateSettings} from "../../actions/settings";

// setAlert destructured from props (passed by the connect)
const Settings = ({ showModal, fightbarDocking, fightbarVertical, dispatch }) => {

  const close = () => {
    dispatch({type: HIDE_SETTINGS_MODAL})
  }

  const size = React.useContext(ResponsiveContext);

  const fightbarSides = [{label: "Left", value: 0}, {label: "Top", value: 1}, {label: "Right", value: 2}, {label: "Bottom", value: 3}, {label: "Floating", value: 4}]

  return (
      showModal && <Layer onEsc={close} onClickOutside={close}>
        <Box className="login-modal" height="large" width="large" background="brand" round={size === 'small' ? false : 'small'} fill={size === 'small'} justify="start">
          <Box border={{color: 'white', side: 'bottom'}} pad={size === 'small' ? 'large' : 'medium'} direction="row" align="center" justify="between">
            <Text color="white" weight="bold" align="center" size="xlarge">
              Settings
            </Text>
            <Anchor onClick={close}><Close /></Anchor>
          </Box>

          <Box justify="evenly" fill>
            Floating fightbar position
            <Select
                options={fightbarSides}
                onChange={(e)=>{dispatch(updateSettings({fightbarDocking: e.selected}))}}
                labelKey="label"
                valueKey="value"
                value={fightbarSides.find((e)=>e.value === fightbarDocking)} />
            <Box className="button-group" width="small" gap="0" direction="row" margin={{ vertical: "small" }} fill="horizontal" pad={size === 'small' ? 'large' : 'medium'}>
              Fightbar Orientation
              <Button active={!fightbarVertical} onClick={() => {dispatch(updateSettings({fightbarVertical: false}))}} label="Horizontal"/>
              <Button active={fightbarVertical} onClick={() => {dispatch(updateSettings({fightbarVertical: true}))}} label="Vertical"/>
            </Box>
            {/*<Box pad={size === 'small' ? 'large' : 'medium'}>
              <Button size="large" primary onClick={(e) => e} label="Save" />
            </Box>*/}
          </Box>
        </Box>
      </Layer>
  );
};

const mapStateToProps = state => {
  if(state.auth.user && state.auth.user.settings) {
    return ({
      showModal: state.ui.showSettingsModal,
      fightbarDocking: state.auth.user.settings.fightbarDocking,
      fightbarVertical: state.auth.user.settings.fightbarVertical,
    })
  } else {
    return ({
      showModal: state.ui.showSettingsModal,
      fightbarDocking: 1,
      fightbarVertical: false
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}
// funtion used to connect store and component both ways
export default connect(
  mapStateToProps, // connect store state to component props
  mapDispatchToProps// connect actions for the component to modify store state
)(Settings); // component exported
