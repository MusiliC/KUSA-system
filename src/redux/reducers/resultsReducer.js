import { actionTypes } from "../actions/actionTypes";

const initialState = [];

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_RESULT:
      return [...state, action.payload];

    case actionTypes.ALL_RESULTS:
      return action.payload;

    case actionTypes.DELETE_RESULT:
      return state.filter((result) => result._id !== action.payload);

    case actionTypes.UPDATE_RESULT:
      return state.map((event) =>
        event._id === action.payload.id ? action.payload : event
      );

    default:
      return state;
  }
};

export default resultsReducer;
