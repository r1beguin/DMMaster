import axios from "axios";
import { setAlert } from './alert'
import { MAP_SAVED, MAP_LOADED } from "./types";


export const login =  image  => async dispatch => {


    let imageObj={
        imageName:"base-image-"+ Date.now(),
        imageData: image.base64.toString()
    }

    try{
        const res = await axios.post("/api/image", imageObj);
        console.log(res);

        dispatch({
            type: MAP_SAVED,
            payload: res.data
        })
    }catch (error) {
        const errors = error.response.data.errors;
        console.log(error);
        
        if (errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }
      }


}