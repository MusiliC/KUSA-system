import { actionTypes } from "../actions/actionTypes";

const initialState = {
  teams: [],
  team: {},
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_TEAM:
      return {
        ...state,
        team: action.payload,
      };

    case actionTypes.ALL_TEAMS:
      return {
        teams: action.payload,
      };

    case actionTypes.ONE_TEAM:
      return {
        team: action.payload,
      };

    case actionTypes.DELETE_TEAM:
      return {
        teams: state.filter((team) => team._id !== action.payload),
      };

    case actionTypes.UPDATE_TEAM:
      return {
        teams: state.map((team) =>
          team._id === action.payload.id ? action.payload : team
        ),
      };

    default:
      return state;
  }
};

export default teamsReducer;
