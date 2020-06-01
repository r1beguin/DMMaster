import axios from "axios";
import { setAlert } from "./alert";
import { MAP_LOADED, MAP_LIST_LOADED } from "./types";


// Deprecated, the request can be used elsewhere tho
export const loadImage = image => async dispatch => {
  try {
    const res = await axios.get("/api/image/", {id: image._id});
    dispatch({
      type: MAP_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log("Error load image", error);
  }
};

// Send the ID of the new active image to the api
// does not update the store
// TODO: update the store if error
export const setActiveImage = image => async dispatch => {
  try {
    await axios.post("/api/image/active", {id: image._id});
  } catch (error) {
    console.log("Error load image", error);
  }
};

// get the current active map on the server
export const loadActiveImage = image => async dispatch => {
  try {
    const res = await axios.get("/api/image/active", {});
    dispatch({
      type: MAP_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log("Error load image", error);
  }
};

export const loadImageList = () => async dispatch => {
  console.log("img list");
  
  try {
    const res = await axios.get("/api/image/list");
    dispatch({
      type: MAP_LIST_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log("Error load image list");
  }
};

// upload image file to server
// todo: alert on validation
export const uploadImage = image => async dispatch => {
  let imageObj = {
    name: "base-image-" + Date.now(),
    data: image.base64.toString()
  };

  try {
    await axios.post("/api/image/upload", imageObj);
    // old way: 
    // const res = await axios.post("/api/image/upload", imageObj);
    // dispatch({
    //   type: MAP_SAVED,
    //   payload: res.data
    // });
    // new way: keep store and db synced
    dispatch(loadImageList());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error);

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};