import Cookies from "js-cookie";

const UserReducer = (state, action) => {
  switch (action.type) {
    //in case when user successfully completes registration
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    //in case when successfully logins to account (token is created)
    case "CHECK_USER":
      Cookies.set("token", action.payload, { expires: 0.125 });
      return {
        ...state,
        loginError: "",
        jwt: action.payload,
      };
    //in case user won't be found - password will be wrong or user with such email do not exist
    case "USER_NOT_FOUND":
      return {
        ...state,
        loginError: action.payload,
      };
    //in case when user will bo logged in or navigate to another page other than loginPage
    case "RESET_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    //in case if user tries to register with already existing email
    case "USER_EXISTS":
      return {
        ...state,
        registrationError: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
