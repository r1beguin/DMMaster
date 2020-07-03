import { UPDATE_SETTINGS } from "../actions/types";
import axios from "axios";

export const updateSettings = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: data,
    });
    const res = await axios.post("/api/settings", {
      params: {
        data: data,
      },
    });
  } catch (error) {
    console.error("Error updating settings", error);
  }
};
