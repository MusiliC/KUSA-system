import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { teamsReducer } from "./teamsReducer";
import { eventsReducer } from "./eventsReducer";

export const reducers = combineReducers({
  authReducer,
  teamsReducer,
  eventsReducer,
});
