import { toast } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";

const initialState = {};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_EMAIL:
      toast("Thank you for reaching us...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state;

    default:
      return state;
  }
};

export default emailReducer;
