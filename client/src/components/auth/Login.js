import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { TextInput, Box, Text, Button } from "grommet";

import { login } from "../../actions/auth";
import PropTypes from "prop-types"; // shortcut: impt

// setAlert destructured from props (passed by the connect)
const Login = ({ login, isAuthenticated }) => {
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

  // redirection after login
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Box>
      <Text color="blue" size="xlarge">
        Sign In
      </Text>

      <Text> Sign Into Your Account</Text>

      <Box width="small" gap="small" margin={{ vertical: "small" }}>
        <TextInput
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <Button onClick={(e) => onSubmit(e)} label="Login" />
      </Box>
    </Box>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// extract the props we are interested in from the store
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// funtion used to connect store and component both ways
export default connect(
  mapStateToProps, // connect store state to component props
  { login } // connect actions for the component to modify store state
)(Login); // component exported
