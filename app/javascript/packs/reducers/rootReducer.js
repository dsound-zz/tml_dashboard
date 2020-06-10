import { combineReducers } from "redux";
import { servicesReducer } from "./servicesReducer";
import { notesReducer } from "./notesReducer";
import { outagesReducer } from "./outagesReducer";
import { currentUserReducer } from "./currentUserReducer";
export default combineReducers({
  services: servicesReducer,
  notes: notesReducer,
  outages: outagesReducer,
  currentUser: currentUserReducer
});