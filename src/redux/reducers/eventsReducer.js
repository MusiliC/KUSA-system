import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {
  events: [],
  event: {},
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
      toast("Event created...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        ...state,
        event: action.payload,
      };

    case actionTypes.ALL_EVENTS:
      return { events: action.payload };

    case actionTypes.ONE_EVENT:
      return { event: action.payload };

    case actionTypes.DELETE_EVENT:
      toast("Event deleted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        events: state.filter((event) => event._id !== action.payload),
      };

    case actionTypes.UPDATE_EVENT:
      toast("Ever updated...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
