import{
    HP_LOADED
} from "../actions/types"

const initialState = {   
    hp: null,
    loading: true,
    creature: null
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
        default:
      return state;
  }
}




