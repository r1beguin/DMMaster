import axios from "axios";
import { setAlert } from './alert'
import { LOAD_FIGHT, NEXT_TURN } from "./types";


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

export const nextTurn = () => async dispatch => {
  try {
    // TODO: sync with db
    //const res = await axios.get("/api/fight");
    dispatch({
      type: NEXT_TURN,
    })
  } catch (error) {
    console.log(error);
    
    dispatch(setAlert("uh ?", "danger"))
  }
}