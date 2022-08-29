import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {
  players: [],
  player: {},
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_PLAYER:
      toast("Player scores posted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        player: action.payload,
      };

    case actionTypes.ALL_PLAYERS:
      return {
        players: action.payload,
      };

    case actionTypes.ONE_PLAYER:
      return {
        player: action.payload,
      };

    case actionTypes.DELETE_PLAYER:
      toast("player data deleted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        players: state.filter((player) => player._id !== action.payload),
      };

    case actionTypes.UPDATE_TEAM:
      toast("player data updated...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        players: state.map((player) =>
          player._id === action.payload.id ? action.payload : player
        ),
      };

    default:
      return state;
  }
};

export default playerReducer;
