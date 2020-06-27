import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {TextInput, Box, Text, Button, Layer, ResponsiveContext, Anchor} from "grommet";

import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import {HIDE_LOGIN_MODAL} from "../../actions/types";
import {bindActionCreators} from "redux";
import {Close} from "grommet-icons"; // shortcut: impt

// setAlert destructured from props (passed by the connect)
const Login = ({ login, isAuthenticated, showModal, dispatch }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ name });
  };

  const close = () => {
    dispatch({type: HIDE_LOGIN_MODAL})
  }

  // redirection after login
  if (isAuthenticated) {
    close()
  }

  const size = React.useContext(ResponsiveContext);

  return (
      showModal && <Layer onEsc={close} onClickOutside={close}>
        <Box height="medium" width="medium" background="brand" round={size === 'small' ? false : 'small'} fill={size === 'small'} justify="between">
          <Box border={{color: 'white', side: 'bottom'}} pad="small" direction="row" align="center" justify="between">
            <Text color="white" weight="bold" align="center" size="xlarge">
              Sign In
            </Text>
            <Anchor onClick={close}><Close /></Anchor>
          </Box>

          <Box width="small" gap="small" margin={{ vertical: "small" }}>
            <TextInput
                type="text"
                background="white"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                fill={true}
            />
          </Box>
          <Box pad="medium">
            <Button background="white" onClick={(e) => onSubmit(e)} label="Login" />
          </Box>
        </Box>
      </Layer>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// extract the props we are interested in from the store
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showModal: state.auth.showModal
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
)(Login); // component exported
