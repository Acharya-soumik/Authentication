import axios from "axios";
import {
  REGISTER_SECCESFULL,
  LOGIN_FAILURE,
  LOGIN_SUCCESSFULL,
  REGISTER_FAILURE,
  LOGOUT
} from "./actiontype";

export const authLogin = res => {
  console.log(res.token);
  if (res.token == undefined) {
    return {
      type: LOGIN_FAILURE,
      payload: res.status
    };
  } else {
    return {
      type: LOGIN_SUCCESSFULL,
      payload: res.status,
      token: res.token
    };
  }
};
export const authRegister = res => {
  if (res == "Registration Succesfull")
    return {
      type: REGISTER_SECCESFULL,
      payload: res
    };
  else
    return {
      type: REGISTER_FAILURE,
      payload: res
    };
};
export const fetchLogin = ({ email, password }) => {
  return dispatch => {
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password
      })
      .then(res => dispatch(authLogin(res.data)));
  };
};

export const fetchRegister = ({ email, password, username }) => {
  return dispatch => {
    axios
      .post("http://localhost:5000/signup", {
        email: email,
        password: password,
        username: username
      })
      .then(res => dispatch(authRegister(res.data)))
      .catch(err => console.log(err));
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
