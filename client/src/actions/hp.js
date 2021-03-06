import {
  HP_LOADED,
  GET_CREATURE_SUCCESS,
  GET_CREATURE_ERROR,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR
} from "../actions/types";
import axios from "axios";

export const loadHp = () => async dispatch => {
  try {
    const res = await axios.get("/api/creature");
    dispatch({
      type: HP_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log("Error load hp");
  }
};

export const getCreature = name => async dispatch => {
  try {
    const res = await axios.get("/api/creature/creature", {
      params: {
        name: name
      }
    });
    dispatch({
      type: GET_CREATURE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.log("Error load creature", error);
    dispatch({
      type: GET_CREATURE_ERROR,
      payload: error
    });
  }
};

export const updatePosition = (id, pos) => async dispatch => {
  // TODO: not in hp.js
  // TODO: generic update creature function
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const body = JSON.stringify({
      id: name,
      posx: pos.posx,
      posy: pos.posy
    });
    const res = await axios.post("api/creature/creature/position", body, config);
    console.log("action", res);
    dispatch({
      type: UPDATE_POSITION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POSITION_ERROR,
      payload: error
    });
  }
};
