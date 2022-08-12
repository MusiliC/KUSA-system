import { actionTypes } from "../actions/actionTypes";

const initialState = {
  events: [],
  event: {},
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case actionTypes.ALL_EVENTS:
      return { events: action.payload };

    case actionTypes.ONE_EVENT:
      return { event: action.payload };

    case actionTypes.DELETE_EVENT:
      return {
        events: state.filter((event) => event._id !== action.payload),
      };

    case actionTypes.UPDATE_EVENT:
      return {
        events: state.map((event) =>
          event._id === action.payload.id ? action.payload : event
        ),
      };

    default:
      return state;
  }
};

export default eventsReducer;
