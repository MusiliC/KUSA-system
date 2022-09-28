import { toast } from "react-toastify";
import * as api from "../../api/emailIndex";
import { actionTypes } from "./actionTypes";

export const sendEmail = (email) => async (dispatch) => {
  try {
    const response = await api.sendEmail(email);

    dispatch({
      type: actionTypes.SEND_EMAIL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};
