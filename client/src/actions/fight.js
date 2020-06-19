import axios from "axios";
import { setAlert } from './alert'

import {
  LOAD_FIGHT, 
  SET_TURN,
  HP_LOADED,
  GET_CREATURE_SUCCESS,
  GET_CREATURE_ERROR,
  UPDATE_POSITION_SUCCESS,
} from "../actions/types";


export const loadFight = () => async dispatch => {
  try {
    const res = await axios.get("/api/fight");
    dispatch({
      type: LOAD_FIGHT,
      payload: res.data.fight
    })

  } catch (error) {
    dispatch(setAlert("cannot load active fight", "danger"))
  }
}

// sends a request to the backend to go next turn
export const nextTurn = () => async dispatch => {
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const body = JSON.stringify({type: "NEXT_TURN_HTTP"});
    await axios.post("/api/fight", body, config);

  } catch (error) {
    console.log(error);
    dispatch(setAlert("uh ?", "danger"))
  }
}

// called when a new fight state is received, update the current turn
export const setTurn = (turn, round) => async dispatch => {
  dispatch({
    type: SET_TURN,
    payload: {
      turn,
      round
    }
  })
}

export const loadHp = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/creature");
    dispatch({
      type: HP_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error load hp");
  }
};

export const getCreature = (name) => async (dispatch) => {
  try {
    const res = await axios.get("/api/creature/creature", {
      params: {
        name: name,
      },
    });
    dispatch({
      type: GET_CREATURE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error load creature", error);
    dispatch({
      type: GET_CREATURE_ERROR,
      payload: error,
    });
  }
};

export const updatePosition = ({ id, posx, posy }) => async (dispatch) => {
  // TODO: generic update creature function ?
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      id: id,
      update: {
        posx: posx,
        posy: posy,
      },
      async: true
    });
    const res = await axios.post("api/creature/update", body, config);
    console.log(res.data);
    // TODO: dispatch new position to store here to prevent rollback ?
  } catch (error) {
    console.log("failed to update")
    dispatch(setAlert(error, "warning"));
  }
};

export const bufferPosition = ({ data }) => async (dispatch) => {
  dispatch({
    type: UPDATE_POSITION_SUCCESS,
    payload: data,
  });
};
