import axios from "axios";
import { setAlert } from './alert'
import { LOAD_FIGHT, SET_TURN } from "./types";


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