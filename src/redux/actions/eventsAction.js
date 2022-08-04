import * as api from "../../api/eventsIndex";
import { actionTypes } from "./actionTypes";

export const createEvent = (event) => async (dispatch) => {
  try {
    const response = await api.createEvent(event);

    dispatch({
      type: actionTypes.CREATE_EVENT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
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

export const updatedEvent = (id, newEvent) => async (dispatch) => {
  try {
    const response = await api.editEvent(id, newEvent);

    dispatch({
      type: actionTypes.UPDATE_EVENT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);

    dispatch({
      type: actionTypes.DELETE_EVENT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
