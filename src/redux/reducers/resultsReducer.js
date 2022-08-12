import { actionTypes } from "../actions/actionTypes";

const initialState = {
  results: [],
  result: {},
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_RESULT:
      return {
        ...state,
        result: action.payload,
      };

    case actionTypes.ALL_RESULTS:
      return {
        results: action.payload,
      };

    case actionTypes.ONE_RESULT:
      return {
        result: action.payload,
      };

    case actionTypes.DELETE_RESULT:
      return {
        results: state.filter((result) => result._id !== action.payload),
      };

    case actionTypes.UPDATE_RESULT:
      return {
        results: state.map((event) =>
          event._id === action.payload.id ? action.payload : event
        ),
      };

    default:
      return state;
  }
};

export default resultsReducer;
