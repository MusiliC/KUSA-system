import { toast } from "react-toastify";
import * as api from "../../api/eventsIndex";
import { actionTypes } from "./actionTypes";

export const createEvent = (event) => async (dispatch) => {
  try {
    const response = await api.createEvent(event);

    dispatch({
      type: actionTypes.CREATE_EVENT,
      payload: response.data,
    });
    dispatch(getEvents());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const getEvents = () => async (dispatch) => {
  try {
    const response = await api.getEvent();

    dispatch({
      type: actionTypes.ALL_EVENTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneEvent = (id) => async (dispatch) => {
  try {
    const response = await api.getOneEvent(id);

    dispatch({
      type: actionTypes.ONE_EVENT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const updatedEvent = (id, newEvent) => async (dispatch) => {
  try {
    const response = await api.editEvent(id, newEvent);

    dispatch({
      type: actionTypes.UPDATE_EVENT,
      payload: response.data,
    });
    dispatch(getEvents());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);

    dispatch({
      type: actionTypes.DELETE_EVENT,
      payload: id,
    });
    dispatch(getEvents())
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};
