import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOGOUT,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL
} from "../actions/types";

// alerts are made of {type, payload: {msg, id}}
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

// function that choses what does the dispatched action
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      console.log(payload)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload // id, name, role
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      console.log(payload);

      return {
        ...state,
        ...payload, // token 
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case USER_LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
