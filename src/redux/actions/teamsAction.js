import * as api from "../../api/teamIndex";
import { actionTypes } from "./actionTypes";

export const registerTeam = (team) => async (dispatch) => {
  try {
    const response = await api.createTeam(team);

    dispatch({
      type: actionTypes.REGISTER_TEAM,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
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

export const updateTeam = (id, updatedTeam) => async (dispatch) => {
  try {
    const response = await api.editTeam(id, updatedTeam);

    dispatch({
      type: actionTypes.UPDATE_TEAM,
      payload: response.data,
    });
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
