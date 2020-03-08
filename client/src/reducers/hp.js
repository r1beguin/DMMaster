import {
  HP_LOADED,
  GET_CREATURE_SUCCESS,
  GET_CREATURE_ERROR,
  GET_CREATURE
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
    default:
      return state;
  }
}
