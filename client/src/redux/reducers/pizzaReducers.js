import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  GET_PIZZA_DETAILS_FAIL,
  GET_PIZZA_DETAILS_REQUEST,
  GET_PIZZA_DETAILS_SUCCESS,
  NEW_PIZZA_FAIL,
  NEW_PIZZA_REQUEST,
  NEW_PIZZA_SUCCESS,
  UPDATE_PIZZA_FAIL,
  UPDATE_PIZZA_REQUEST,
  UPDATE_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
} from '../constants/pizzaConstants';

export const pizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case GET_PIZZAS_REQUEST:
      return { loading: true, ...state };
    case GET_PIZZAS_SUCCESS:
      return { loading: false, pizzas: action.payload };
    case GET_PIZZAS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pizzaDetailsReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case GET_PIZZA_DETAILS_REQUEST:
      return { loading: true, ...state };
    case GET_PIZZA_DETAILS_SUCCESS:
      return { loading: false, pizza: action.payload };
    case GET_PIZZA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PIZZA_REQUEST:
    case UPDATE_PIZZA_REQUEST:
    case DELETE_PIZZA_REQUEST:
      return { ...state, loading: true };
    case NEW_PIZZA_SUCCESS:
      return { loading: false, created: true };
    case UPDATE_PIZZA_SUCCESS:
      return { ...state, loading: false, updated: true };
    case DELETE_PIZZA_SUCCESS:
      return { ...state, loading: false, deleted: true };
    case NEW_PIZZA_FAIL:
    case UPDATE_PIZZA_FAIL:
    case DELETE_PIZZA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
