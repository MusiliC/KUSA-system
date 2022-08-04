import { actionTypes } from "../actions/actionTypes";

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
      return [...state, action.payload];

    case actionTypes.ALL_EVENTS:
      return [action.payload];

    case actionTypes.DELETE_EVENT:
      return state.filter((event) => event._id !== action.payload);

    case actionTypes.UPDATE_EVENT:
      return state.map((event) =>
        event._id === action.payload.id ? action.payload : event
      );

    default:
      return state;
  }
};

export default eventsReducer;
