import { GET_NOTES, SET_NOTES, SET_BUFFER } from "../actions/types";

const initialState = {
  data: [
    {
      name: "",
      index: 0,
      edit: false,
      content: "",
    },
  ],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        data: payload.data,
      };
    case SET_NOTES:
      return {
        ...state,
        ...payload,
      };
    case SET_BUFFER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
