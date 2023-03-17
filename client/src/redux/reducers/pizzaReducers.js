import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  NEW_PIZZA_FAIL,
  NEW_PIZZA_REQUEST,
  NEW_PIZZA_SUCCESS,
} from '../constants/pizzaConstants';

export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
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

export const addNewPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PIZZA_REQUEST:
      return { loading: true, ...state };
    case NEW_PIZZA_SUCCESS:
      return { loading: false, success: true };
    case NEW_PIZZA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
