import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types"; // shortcut: impt
 
// setAlert destructured from props (passed by the connect)
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: ""
  });

  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login({ name });
  };

  // redirection after login
  if (isAuthenticated) {
    return <Redirect to="/"/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// extract the props we are interested in from the store
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// funtion used to connect store and component both ways
export default connect(
  mapStateToProps, // connect store state to component props
  { login } // connect actions for the component to modify store state
)(Login); // component exported
