import { toast } from "react-toastify";
import * as api from "../../api/fixturesIndex";
import { actionTypes } from "./actionTypes";

export const generateFixtures = (eventId) => async (dispatch) => {
  try {
    const response = await api.generateFixtures(eventId);

    dispatch({
      type: actionTypes.UPLOAD_FIXTURES,
      payload: response.data.result,
    });
    dispatch(allFixtures());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const allFixtures =
  (event = null) =>
  async (dispatch) => {
    try {
      const response = await api.getFixtures(event);

      dispatch({
        type: actionTypes.GET_FIXTURES,
        payload: response.data.fixtures,
      });
    } catch (error) {
      console.log(error);
    }
  };


  export const deleteFixtures = (id) => async (dispatch) => {
    try {
      await api.deleteFixture(id);

      dispatch({
        type: actionTypes.DELETE_FIXTURE,
        payload: id,
      });
     
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };