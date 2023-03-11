import axios from 'axios';
import {
  GET_PIZZA_FAIL,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
} from '../constants/pizzaConstants';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: GET_PIZZA_REQUEST });
  try {
    const { data } = await axios.get('/pizzas');
    console.log({ data });
    dispatch({ type: GET_PIZZA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PIZZA_FAIL, payload: error });
  }
};
