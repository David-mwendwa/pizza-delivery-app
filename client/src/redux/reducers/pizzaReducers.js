import {
  PIZZAS_FAIL,
  PIZZAS_REQUEST,
  PIZZAS_SUCCESS,
  PIZZA_DETAILS_FAIL,
  PIZZA_DETAILS_REQUEST,
  PIZZA_DETAILS_SUCCESS,
  PIZZA_CREATE_FAIL,
  PIZZA_CREATE_REQUEST,
  PIZZA_CREATE_SUCCESS,
  PIZZA_UPDATE_FAIL,
  PIZZA_UPDATE_REQUEST,
  PIZZA_UPDATE_SUCCESS,
  PIZZA_DELETE_FAIL,
  PIZZA_DELETE_REQUEST,
  PIZZA_DELETE_SUCCESS,
  PIZZA_RESET,
} from '../constants/pizzaConstants';

export const pizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case PIZZAS_REQUEST:
      return { loading: true, ...state };
    case PIZZAS_SUCCESS:
      return { loading: false, pizzas: action.payload };
    case PIZZAS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pizzaReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case PIZZA_DETAILS_REQUEST:
    case PIZZA_CREATE_REQUEST:
    case PIZZA_UPDATE_REQUEST:
    case PIZZA_DELETE_REQUEST:
      return { ...state, loading: true };
    case PIZZA_DETAILS_SUCCESS:
      return { loading: false, pizza: action.payload };
    case PIZZA_CREATE_SUCCESS:
      return { loading: false, created: true };
    case PIZZA_UPDATE_SUCCESS:
      return { ...state, loading: false, updated: true };
    case PIZZA_DELETE_SUCCESS:
      return { ...state, loading: false, deleted: true };
    case PIZZA_DETAILS_FAIL:
    case PIZZA_CREATE_FAIL:
    case PIZZA_UPDATE_FAIL:
    case PIZZA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PIZZA_RESET:
      return {};
    default:
      return state;
  }
};
