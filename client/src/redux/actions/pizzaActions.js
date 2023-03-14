import axios from 'axios';
import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
} from '../constants/pizzaConstants';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    console.log({ data });
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: data.pizzas });
  } catch (error) {
    dispatch({ type: GET_PIZZAS_FAIL, payload: error });
  }
};
