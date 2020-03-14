import {
  HP_LOADED,
  GET_CREATURE_SUCCESS,
  GET_CREATURE_ERROR,
  GET_CREATURE,
  UPDATE_POSITION,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR
} from "../actions/types";

const initialState = {
  hp: 0,
  loading: false,
  creature: {
    name: "",
    role: "",
    hp: 0,
    alive: false,
    avatar: "",
    user: "",
    monster: "",
    posx: 0,
    posy: 0
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HP_LOADED:
      return {
        ...state,
        hp: payload.hp,
        loading: false,
        creature: payload
      };

    case GET_CREATURE:
      return {
        ...state,
        loading: true
      };
    case GET_CREATURE_SUCCESS:
      console.log("action", action.payload);
      return {
        loading: false,
        creature: action.payload
      };
    case GET_CREATURE_ERROR:
      return {
        ...state
      };

    case UPDATE_POSITION:
      return {
        ...state,
        loading: true
      };
    case UPDATE_POSITION_SUCCESS:
      return {
        loading: false,
        creature: action.payload
      };
    case UPDATE_POSITION_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}
