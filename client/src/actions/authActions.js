import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//registerInstructor action creator takes data and dispatch action to reducer along with payload
export const registerInstructor = (instructorData, history) => dispatch => {
  //here we are dealing with asyncnorous data while fetching from backend we need to wait for /////response then we can dispatch action and payload to the reducer.
  //so we need to use thunk middleware

  axios
    .post("http://localhost:5000/instructors/register", instructorData)
    .then(res => history.push("/login/instructor"))
    .catch(err =>
      dispatch({
        //we are just not returning we are dispatching using redux-thunk
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerStudent = (studentData, history) => dispatch => {
  //here we are dealing with asyncnorous data while fetching from backend we need to wait for /////response then we can dispatch action and payload to the reducer.
  //so we need to use thunk middleware

  axios
    .post("http://localhost:5000/students/register", studentData)
    .then(res => history.push("/login/student"))
    .catch(err =>
      dispatch({
        //we are just not returning we are dispatching using redux-thunk
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerAdmin = (adminData, history) => dispatch => {
  //here we are dealing with asyncnorous data while fetching from backend we need to wait for /////response then we can dispatch action and payload to the reducer.
  //so we need to use thunk middleware

  axios
    .post("http://localhost:5000/admins/register", adminData)
    .then(res => history.push("/login/admin"))
    .catch(err =>
      dispatch({
        //we are just not returning we are dispatching using redux-thunk
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get instructor token , //loginInstructor action creator
export const loginInstructor = instructorData => dispatch => {
  axios
    .post("http://localhost:5000/instructors/login", instructorData)
    .then(res => {
      // console.log(res);
      //save token to local storage
      const { token } = res.data; 
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      
      //set token to auth header
      setAuthToken(token);
      //Decode token to get instructor data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get student token , //loginStudent action creator
export const loginStudent = studentData => dispatch => {
  axios
    .post("http://localhost:5000/students/login", studentData)
    .then(res => {
      // console.log(res);
      //save token to local storage
      const { token } = res.data; 
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      
      //set token to auth header
      setAuthToken(token);
      //Decode token to get instructor data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get admin token , //loginAdmin action creator
export const loginAdmin = adminData => dispatch => {
  axios
    .post("http://localhost:5000/admins/login", adminData)
    .then(res => {
      // console.log(res);
      //save token to local storage
      const { token } = res.data; 
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      
      //set token to auth header
      setAuthToken(token);
      //Decode token to get instructor data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user , //setCurrentUser action creator
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded //actual user with all info
  };
};

//Log user out , //logoutUser action creator
export const logoutUser = () => dispatch => {
  //Remove token from ls
  localStorage.removeItem("jwtToken");
  //Remove auth header for fututre requests
  setAuthToken(false);
  //set current user to {} which will
  dispatch(setCurrentUser({}));
};
