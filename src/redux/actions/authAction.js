import * as api from "../../api/authIndex";
import { actionTypes } from "./actionTypes";

export const registerUser = (user) => async (dispatch) => {
  try {
    const response = await api.createUser(user);

    dispatch({
      type: actionTypes.REGISTER_USER,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUser = (user) => async (dispatch) => {
  try {
    const response = await api.loginUser(user);

    dispatch({
      type: actionTypes.SIGN_IN,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await api.allUsers();

    dispatch({
      type: actionTypes.ALL_USERS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({
      type: actionTypes.DELETE_USER,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_OUT,
    });
  };
};
