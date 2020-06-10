import { GET_NOTES, SET_NOTES, SET_BUFFER } from "../actions/types";
import axios from "axios";

export const getNotes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/notes", {});
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error get notes");
  }
};

export const setNotes = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/notes", {
      params: {
        data: data,
      },
    });
    dispatch({
      type: SET_NOTES,
      payload: res.data,
    });
    dispatch(getNotes());
  } catch (error) {
    console.log("Error set notes");
  }
};

export const setBuffer = ({ data }) => async (dispatch) => {
  dispatch({
    type: SET_BUFFER,
    payload: data,
  });
};
