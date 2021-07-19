import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SEND_MAIL,
  RESET_PASSWORD,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
      alert("REGISTER SUCCESS");
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      console.log(err);
    }
  };

  // Send mail
  const sendMail = async (email) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/mail", { email }, config);
      dispatch({
        type: SEND_MAIL,
      });

      alert("Mail has been sent");
    } catch (error) {
      alert(`${error.response.status} ${error.response.data.msg}`);
    }
  };

  // Reset password
  const resetPassword = async (password, id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/resetPassword",
        { password, id },
        config
      );
      console.log(res.data.msg);
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        passwordReset: state.passwordReset,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        sendMail,
        resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
