import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../constants/userConstants';

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post('/api/v1/users/register', user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
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
    const { data } = await axios.post('/api/users/login', user, config);
    console.log({ data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
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
