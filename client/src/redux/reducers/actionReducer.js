import {
  GET_MANY_REQUEST,
  GET_MANY_SUCCESS,
  GET_MANY_FAIL,
  GET_ONE_REQUEST,
  GET_ONE_FAIL,
  CREATE_ONE_REQUEST,
  CREATE_ONE_SUCCESS,
  CREATE_ONE_FAIL,
  UPDATE_ONE_REQUEST,
  UPDATE_ONE_SUCCESS,
  UPDATE_ONE_FAIL,
  UPDATE_ONE_RESET,
  DELETE_ONE_REQUEST,
  DELETE_ONE_SUCCESS,
  DELETE_ONE_FAIL,
  DELETE_ONE_RESET,
  GET_ONE_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/actionConstants';

export const getManyReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case GET_MANY_REQUEST:
      return { ...state, loading: true };
    case GET_MANY_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_MANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOneReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case GET_ONE_REQUEST:
      return { ...state, loading: true };
    case GET_ONE_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createOneReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case CREATE_ONE_REQUEST:
      return { ...state, loading: true };
    case CREATE_ONE_SUCCESS:
      return { ...state, loading: false, success: true };
    case CREATE_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateOneReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case UPDATE_ONE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ONE_SUCCESS:
      return { ...state, loading: false, success: true };
    case UPDATE_ONE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ONE_RESET:
      return { ...state, success: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const deleteOneReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case DELETE_ONE_REQUEST:
      return { ...state, loading: true };
    case DELETE_ONE_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_ONE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ONE_RESET:
      return { ...state, success: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
