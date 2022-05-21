import React, { useReducer, createContext } from "react";
import UserReducer from "../reducers/userReducer";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  users: [],
  loginError: "",
  registrationError: "",
  jwt: null,
};

export const UserContext = createContext(initialState);

//Provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  //function used to add user with given information
  async function addUser(user) {
    let result;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/registration",
        user
      );
      if (response.data.success) {
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
        result = true;
      } else {
        dispatch({
          type: "USER_EXISTS",
          payload: response.data.error,
        });
        result = false;
      }
    } catch (err) {
      console.log(err);
      result = false;
    }
    return result;
  }

  //function used to verify user during login (if user exists or not)
  async function checkUser(user) {
    let result;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        user
      );
      if (response.data.success) {
        dispatch({
          type: "CHECK_USER",
          payload: response.data.token,
        });
        Cookies.set("userName", response.data.user.fname, { expires: 0.125 });
        result = true;
      } else {
        dispatch({
          type: "USER_NOT_FOUND",
          payload: response.data.error,
        });
        result = false;
      }
    } catch (err) {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: user,
      });
      result = false;
    }
    return result;
  }

  //function used to identify user using jwt
  async function verifyUser() {
    let result;
    try {
      const response = await axios.get(`http://localhost:5000/api/login`, {
        headers: {
          "x-auth-token": Cookies.get("token"),
        },
      });

      if (!response.data.success) {
        dispatch({
          type: "USER_NOT_FOUND",
          payload: response.data.error,
        });
      }

      result = response.data.success ? response : false;
    } catch (error) {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: error,
      });
      result = false;
    }
    return result;
  }

  //function used to update user with new data
  async function updateUser(
    newCartProducts,
    newWishlistProducts,
    newTransactions
  ) {
    let result;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/login`,
        {
          cartProducts: newCartProducts,
          wishlistProducts: newWishlistProducts,
          transactions: newTransactions,
        },
        {
          headers: {
            "x-auth-token": Cookies.get("token"),
          },
        }
      );

      if (response.data.success) {
        dispatch({
          type: "LOGGED_USER",
          payload: response.data.user,
        });
        result = true;
      } else {
        dispatch({
          type: "USER_NOT_FOUND",
          payload: response.data.error,
        });
        result = false;
      }
    } catch (err) {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: "Error occurred!",
      });
      result = false;
    }
    return result;
  }

  const resetError = () => {
    dispatch({
      type: "RESET_ERROR",
      payload: "",
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loginError: state.loginError,
        registrationError: state.registrationError,
        jwt: state.jwt,
        addUser,
        checkUser,
        verifyUser,
        updateUser,
        resetError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
