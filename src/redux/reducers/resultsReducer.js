import { actionTypes } from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  results: [],
  result: {},
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_RESULT:
       toast("Results posted successful...", {
         position: toast.POSITION.BOTTOM_RIGHT,
       });
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
       toast.error("Results deleted successful...", {
         position: toast.POSITION.BOTTOM_RIGHT,
       });
      return {
        results: state.filter((result) => result._id !== action.payload),
      };

    case actionTypes.UPDATE_RESULT:
       toast.error("Result updated successful...", {
         position: toast.POSITION.BOTTOM_RIGHT,
       });
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
