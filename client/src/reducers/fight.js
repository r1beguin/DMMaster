import { 
  LOAD_FIGHT,
  SET_TURN,
} from "../actions/types";

const initialState = {
  name: "",
  round: 0,
  turn: 0,
  involved: [],
};

// function that choses what does the dispatched action
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_FIGHT:
      return {
        name: payload.name,
        round: payload.round,
        turn: payload.turn,
        involved: payload.involved.map(thing => {
          return {
            alive: thing.alive,
            creature: thing.creature
          }
        })
      };

    case SET_TURN:
      return {
        ...state,
        turn: payload.turn,
        round: payload.round,
      };

    default:
      return state;
  }
}
