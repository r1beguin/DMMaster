import { GET_NOTES, SET_NOTES } from "../actions/types";
import axios from "axios";

export const getNotes = ({ name }) => async (dispatch) => {
  try {
    const res = await axios.get("/api/notes", {
      params: {
        name: name,
      },
    });
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error get notes");
  }
};
