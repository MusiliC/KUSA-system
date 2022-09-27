import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {
  fixtures: [],
  oneFixture: {},
};

const fixtureReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_FIXTURES:
      toast("Fixtures generated successfully...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        fixtures: [action.payload],
      };

    case actionTypes.GET_FIXTURES:
      return { fixtures: action.payload };

    case actionTypes.DELETE_FIXTURE:
      toast("Fixtures deleted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        events: state.filter((event) => event._id !== action.payload),
      };

    default:
      return state;
  }
};

export default fixtureReducer;
