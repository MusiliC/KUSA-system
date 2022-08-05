import { actionTypes } from "../actions/actionTypes";

const initialState = [];

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_TEAM:
      return [...state, action.payload];

    case actionTypes.ALL_TEAMS:
     
      return action.payload;

    case actionTypes.DELETE_TEAM:
      return state.filter((team) => team._id !== action.payload);

    case actionTypes.UPDATE_TEAM:
      return state.map((team) =>
        team._id === action.payload.id ? action.payload : team
      );

    default:
      return state;
  }
};

export default teamsReducer;
