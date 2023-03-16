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
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: data.data.pizzas });
  } catch (error) {
    dispatch({ type: GET_PIZZAS_FAIL, payload: error });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
  let filteredPizzas = null;
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    filteredPizzas = data.data.pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    if (category !== 'all') {
      filteredPizzas = data.data.pizzas.filter(
        (pizza) => pizza.category.toLowerCase() === category.toLowerCase()
      );
    }
    console.log({ filteredPizzas });
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: filteredPizzas });
  } catch (error) {
    dispatch({ type: GET_PIZZAS_FAIL, payload: error });
  }
};
