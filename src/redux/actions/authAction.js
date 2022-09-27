import { toast } from "react-toastify";
import * as api from "../../api/authIndex";
import { actionTypes } from "./actionTypes";

export const registerUser = (user) => async (dispatch) => {
  try {
    const response = await api.createUser(user);
    localStorage.setItem("token", response.data);
    dispatch({
      type: actionTypes.REGISTER_USER,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const signUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(user);

    localStorage.setItem("token", data.token);
    dispatch({
      type: actionTypes.SIGN_IN,
      payload: data.token,
    });

    return { success: true, auth: data.user };
  } catch (error) {
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { success: false };
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
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
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
    toast.error(error.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  dispatch(getUsers());
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_OUT,
    });
  };
};
