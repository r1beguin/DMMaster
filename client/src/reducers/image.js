import { MAP_SAVED, MAP_LOADED, MAP_LIST_LOADED } from "../actions/types";

const initialState = {
  name: "",
  data: "",
  imageList: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MAP_LOADED:
      // payload contains {name, data}
      return {
        ...state,
        ...payload
      };
    case MAP_SAVED:
      return {
        ...state,
        ...payload
      };
    case MAP_LIST_LOADED:
      return {
        ...state,
        imageList: payload
      };

    default:
      return state;
  }
}
