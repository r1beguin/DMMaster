import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOGOUT,
  UPDATE_SETTINGS
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
    case UPDATE_SETTINGS:
      state.user.settings = {...state.user.settings, ...payload}
      console.log({...state}, {...payload})
      return {
        ...state
      }
    default:
      return state;
  }
}
