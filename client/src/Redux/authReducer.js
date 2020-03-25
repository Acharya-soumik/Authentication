import {
  LOGIN_SUCCESSFULL,
  LOGIN_FAILURE,
  REGISTER_SECCESFULL,
  REGISTER_FAILURE,
  LOGOUT
} from "./actiontype";

const initialState = {
  status: false,
  message: "",
  token: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFULL:
      console.log(action);
      return {
        status: true,
        message: action.payload,
        token: action.token
      };
    case LOGIN_FAILURE:
      console.log(action.payload);
      return {
        status: false,
        message: action.payload,
        token: ""
      };
    case REGISTER_SECCESFULL:
      return {
        ...state,
        message: action.payload
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        message: action.payload
      };
    case LOGOUT:
      return {
        status: false,
        message: "",
        token: ""
      };
    default:
      return state;
  }
};
