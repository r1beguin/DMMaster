import{
    HP_LOADED
} from "../actions/types"
import axios from "axios";

export const loadHp = () => async dispatch => {
    
    try {
      const res = await axios.get("/api/hp");
      dispatch({
        type: HP_LOADED,
        payload: res.data
      })
    } catch (error) {
      console.log("Error load hp")
    }
}
