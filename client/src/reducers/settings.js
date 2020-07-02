import {
  SHOW_SETTINGS_MODAL,
  HIDE_SETTINGS_MODAL, UPDATE_FIGHTBAR_DOCKING, UPDATE_FIGHTBAR_ORIENTATION
} from "../actions/types";

// alerts are made of {type, payload: {msg, id}}
const initialState = {
  fightbarDocking: 4,
  fightbarVertical: false,
  showModal: false
};

// function that choses what does the dispatched action
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SETTINGS_MODAL:
      return {
        ...state,
        showModal: true
      };
    case HIDE_SETTINGS_MODAL:
      return {
        ...state,
        showModal: false
      };
    case UPDATE_FIGHTBAR_DOCKING:
      return {
        ...state,
        fightbarDocking: payload
      }
    case UPDATE_FIGHTBAR_ORIENTATION:
      return {
        ...state,
        fightbarVertical: payload
      }

    default:
      return state;
  }
}
