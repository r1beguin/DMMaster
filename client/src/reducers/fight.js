import { 
  LOAD_FIGHT,
  NEXT_TURN,
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
    case NEXT_TURN:
      var turn = state.turn + 1;
      var round = state.round;
      if (turn === state.involved.length){
        turn = 0;
        round++;
      }
      return {
        ...state,
        turn,
        round,
      };
    default:
      return state;
  }
}
