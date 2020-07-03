import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import hp from "./hp";
import fight from "./fight";
import image from "./image";
import notes from "./notes";
import ui from "./ui";

export default combineReducers({
  alert,
  auth,
  hp,
  fight,
  image,
  notes,
  ui,
});
