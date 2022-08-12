import { combineReducers } from "redux";
import authReducer from "./authReducer";
import teamsReducer from "./teamsReducer";
import eventsReducer from "./eventsReducer";
import playerReducer from "./playerReducer";
import resultsReducer from "./resultsReducer";

export const reducers = combineReducers({
  authReducer,
  teamsReducer,
  eventsReducer,
  playerReducer,
  resultsReducer,
});
