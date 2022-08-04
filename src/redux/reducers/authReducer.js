import { actionTypes } from "../actions/actionTypes";

const initialState = {
  users: [],
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_USERS:
      return {
        users: action.payload,
      };

    case actionTypes.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.SIGN_IN:
      return {
        user: action.payload,
      };

    case actionTypes.DELETE_USER:
      return {
        users: state.filter((deleteUser) => deleteUser._id !== state._id),
      };

    default:
      return state;
  }
};

export default authReducer;
