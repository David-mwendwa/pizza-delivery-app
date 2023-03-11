import {
  GET_PIZZA_FAIL,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
} from '../constants/pizzaConstants';

export const getAllPizzasReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PIZZA_REQUEST:
      return {
        ...state,
      };
    case GET_PIZZA_SUCCESS:
      return {
        pizzas: action.payload,
      };
    case GET_PIZZA_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
