import { actionTypes } from "../actions/actionTypes";

const initialState = [];

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_PLAYER:
      return [...state, action.payload];

    case actionTypes.ALL_PLAYERS:
      return action.payload;

    case actionTypes.DELETE_PLAYER:
      return state.filter((player) => player._id !== action.payload);

    case actionTypes.UPDATE_TEAM:
      return state.map((player) =>
        player._id === action.payload.id ? action.payload : player
      );

    default:
      return state;
  }
};

export default playerReducer;
