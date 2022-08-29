import { toast } from "react-toastify";
import * as api from "../../api/playerIndex";
import { actionTypes } from "./actionTypes";

export const postScorer = (player) => async (dispatch) => {
  try {
    const response = await api.postPlayer(player);

    dispatch({
      type: actionTypes.POST_PLAYER,
      payload: response.data,
    });
    dispatch(getScorers());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const getScorers = () => async (dispatch) => {
  try {
    const response = await api.getPlayers();

    dispatch({
      type: actionTypes.ALL_PLAYERS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  
  }
};

export const getOneScore = (id) => async (dispatch) => {
  try {
    const response = await api.onePlayer(id);

    dispatch({
      type: actionTypes.ONE_PLAYER,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const updateScorers = (id, updatedPlayers) => async (dispatch) => {
  try {
    const response = await api.editPlayer(id, updatedPlayers);

    dispatch({
      type: actionTypes.UPDATE_PLAYER,
      payload: response.data,
    });
    dispatch(getScorers());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const deleteScorer = (id) => async (dispatch) => {
  try {
    await api.deletePlayer(id);

    dispatch({
      type: actionTypes.DELETE_PLAYER,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  dispatch(getScorers());
};
