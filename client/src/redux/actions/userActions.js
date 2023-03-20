import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants';

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post('/api/v1/users/register', user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('currentUser', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/v1/users/login', user, config);
    console.log({ data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('currentUser', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/api/v1/users/logout');
  localStorage.removeItem('currentUser');
  dispatch({ type: USER_LOGOUT });
};

/**
 * Get a single user
 * @param {*} id - id to request user details
 * @returns one document
 */
export const getUsers = () => async (dispatch) => {
  dispatch({ type: USERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch({ type: USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user details
export const getUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/api/v1/admin/users/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await axios.delete(`/api/v1/admin/users/${id}`);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user
export const updateUser = (id, newDetails) => async (dispatch) => {
  console.log({ id, newDetails });
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    await axios.patch(`/api/v1/admin/users/${id}`, newDetails);
    dispatch({ type: USER_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
