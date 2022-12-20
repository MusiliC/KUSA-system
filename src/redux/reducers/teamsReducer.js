import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {
  allTeams: [],
  topTeams: [],
  team: {},
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_TEAM:
      toast("Team registered successful...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        team: action.payload,
      };

    case actionTypes.ALL_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };

    case actionTypes.TOP_TEAMS:
      return {
        ...state,
        topTeams: action.payload,
      };

    case actionTypes.ONE_TEAM:
      return {
        team: action.payload,
      };

    case actionTypes.DELETE_TEAM:
      toast.error("Team deleted successful...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        allTeams: state.filter((team) => team._id !== action.payload),
      };

    case actionTypes.UPDATE_TEAM:
      toast.success("Team updated successful...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        allTeams: state.map((team) =>
          team._id === action.payload.id ? action.payload : team
        ),
      };

    case actionTypes.UPDATE_WIN:
      return {
        allTeams: state.map((team) =>
          team._id === action.payload.id ? action.payload : team
        ),
      };

    case actionTypes.UPDATE_DRAW:
      return {
        allTeams: state.map((team) =>
          team._id === action.payload.id ? action.payload : team
        ),
      };

    case actionTypes.UPDATE_LOST:
      return {
        allTeams: state.map((team) =>
          team._id === action.payload.id ? action.payload : team
        ),
      };

    default:
      return state;
  }
};

export default teamsReducer;
