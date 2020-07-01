import React from "react";
import { connect } from "react-redux";

import {Box, Text, Button, Layer, ResponsiveContext, Anchor} from "grommet";

import { login } from "../../actions/auth";
import {HIDE_SETTINGS_MODAL, UPDATE_FIGHTBAR_DOCKING, UPDATE_FIGHTBAR_ORIENTATION} from "../../actions/types";
import {bindActionCreators} from "redux";
import {Close,} from "grommet-icons";

// setAlert destructured from props (passed by the connect)
const Settings = ({ showModal, dispatch }) => {

  const close = () => {
    dispatch({type: HIDE_SETTINGS_MODAL})
  }

  const size = React.useContext(ResponsiveContext);

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
            <Box width="small" gap="small" margin={{ vertical: "small" }} fill="horizontal" pad={size === 'small' ? 'large' : 'medium'}>
              Floating fightbar position
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_DOCKING, payload: 1})}} label="Top"/>
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_DOCKING, payload: 3})}} label="Bottom"/>
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_DOCKING, payload: 0})}} label="Left"/>
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_DOCKING, payload: 2})}} label="Right"/>
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_DOCKING, payload: 4})}} label="Floating"/>
            </Box>
            <Box width="small" gap="small" margin={{ vertical: "small" }} fill="horizontal" pad={size === 'small' ? 'large' : 'medium'}>
              Fightbar Orientation
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_ORIENTATION, payload: false})}} label="Horizontal"/>
              <Button onClick={() => {dispatch({type: UPDATE_FIGHTBAR_ORIENTATION, payload: true})}} label="Vertical"/>
            </Box>
            {/*<Box pad={size === 'small' ? 'large' : 'medium'}>
              <Button size="large" primary onClick={(e) => e} label="Save" />
            </Box>*/}
          </Box>
        </Box>
      </Layer>
  );
};

// extract the props we are interested in from the store
const mapStateToProps = (state) => ({
  showModal: state.settings.showModal
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({login}, dispatch)
  }
}
// funtion used to connect store and component both ways
export default connect(
  mapStateToProps, // connect store state to component props
  mapDispatchToProps// connect actions for the component to modify store state
)(Settings); // component exported
