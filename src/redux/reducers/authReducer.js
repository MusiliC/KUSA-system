import { toast, ToastContainer } from "react-toastify";
import { actionTypes } from "../actions/actionTypes";
import jwtDecode from "jwt-decode";

const initialState = {
  users: [],
  user: {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
    _id: null,
    isAdmin: null
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_USERS:
      return {
        users: action.payload,
      };

    case actionTypes.REGISTER_USER:
      toast("welcome...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      const authUser = jwtDecode(action.payload);
      return {
        user: {
          ...state,
          token: action.payload,
          name: authUser.name,
          email: authUser.email,
          _id: authUser._id,
          isAdmin:authUser.isAdmin
        },
      };

    case actionTypes.SIGN_IN:
      const validUser = jwtDecode(action.payload);
      toast.success("Welcome...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      return {
        user: {
          ...state,
          token: action.payload,
          name: validUser.name,
          email: validUser.email,
          _id: validUser._id,
          isAdmin: validUser.isAdmin
        },
      };

    case actionTypes.DELETE_USER:
      toast("User deleted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        users: state.filter((deleteUser) => deleteUser._id !== state._id),
      };

    case actionTypes.SIGN_OUT:
      localStorage.removeItem("token");
      toast("Logging out..", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      return {
        token: null,
        name: null,
        email: null,
        _id: null,
      };

    default:
      return state;
  }
};

export default authReducer;
