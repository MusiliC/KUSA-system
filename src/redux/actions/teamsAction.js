import { toast } from "react-toastify";
import * as api from "../../api/teamIndex";
import { actionTypes } from "./actionTypes";

export const registerTeam = (team) => async (dispatch) => {
  try {
    const response = await api.createTeam(team);

    dispatch({
      type: actionTypes.REGISTER_TEAM,
      payload: response.data,
    });
    dispatch(getTeams());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const getTeams = () => async (dispatch) => {
  try {
    const response = await api.getTeams();

    dispatch({
      type: actionTypes.ALL_TEAMS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const geBestTeams = () => async (dispatch) => {
  try {
    const response = await api.getTopTeams();

    dispatch({
      type: actionTypes.TOP_TEAMS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTeam = (id) => async (dispatch) => {
  try {
    const response = await api.oneTeam(id);

    dispatch({
      type: actionTypes.ONE_TEAM,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const updateTeam = (id, updatedTeam) => async (dispatch) => {
  try {
    const response = await api.editTeam(id, updatedTeam);

    dispatch({
      type: actionTypes.UPDATE_TEAM,
      payload: response.data,
    });
    dispatch(getTeams());
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const updateWin = (id, updatedTeam) => async (dispatch) => {
  try {
    const response = await api.editWin(id, updatedTeam);

    dispatch({
      type: actionTypes.UPDATE_WIN,
      payload: response.data,
    });
    dispatch(getTeams());
  } catch (error) {
    console.log(error);
  }
};

export const updateDraw = (id, updatedTeam) => async (dispatch) => {
  try {
    const response = await api.editDraw(id, updatedTeam);

    dispatch({
      type: actionTypes.UPDATE_DRAW,
      payload: response.data,
    });
    dispatch(getTeams());
  } catch (error) {
    console.log(error);
  }
};

export const updateLost = (id, updatedTeam) => async (dispatch) => {
  try {
    const response = await api.editLost(id, updatedTeam);

    dispatch({
      type: actionTypes.UPDATE_LOST,
      payload: response.data,
    });
    dispatch(getTeams());
  } catch (error) {
    console.log(error);
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  try {
    await api.deleteTeam(id);

    dispatch({
      type: actionTypes.DELETE_TEAM,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
  dispatch(getTeams());
};
