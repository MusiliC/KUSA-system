import { toast } from "react-toastify";
import * as api from "../../api/resultsIndex";
import { actionTypes } from "./actionTypes";

export const postResults = (result) => async (dispatch) => {
  try {
    const response = await api.postResults(result);

    dispatch({
      type: actionTypes.POST_RESULT,
      payload: response.data,
    });
    dispatch(getResults());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const getResults = () => async (dispatch) => {
  try {
    const response = await api.getResults();

    dispatch({
      type: actionTypes.ALL_RESULTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
   
  }
};

export const getOneResult = (id) => async (dispatch) => {
  try {
    const response = await api.oneResult(id);

    dispatch({
      type: actionTypes.ONE_RESULT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const updatedResults = (id, newResult) => async (dispatch) => {
  try {
    const response = await api.editResult(id, newResult);

    dispatch({
      type: actionTypes.UPDATE_RESULT,
      payload: response.data,
    });
    dispatch(getResults());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const deleteResult = (id) => async (dispatch) => {
  try {
    await api.deleteResults(id);

    dispatch({
      type: actionTypes.DELETE_RESULT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch(getResults());
  }
};
