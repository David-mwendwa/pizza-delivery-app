import axios from 'axios';
import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  NEW_PIZZA_FAIL,
  NEW_PIZZA_REQUEST,
  NEW_PIZZA_SUCCESS,
} from '../constants/pizzaConstants';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({ type: GET_PIZZAS_FAIL, payload: error });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
  let filteredPizzas = null;
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    console.log(data);
    filteredPizzas = data.data.pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    if (category !== 'all') {
      filteredPizzas = data.data.pizzas.filter(
        (pizza) => pizza.category.toLowerCase() === category.toLowerCase()
      );
    }
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: filteredPizzas });
  } catch (error) {
    dispatch({
      type: GET_PIZZAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewPizza = (newPizza) => async (dispatch) => {
  dispatch({ type: NEW_PIZZA_REQUEST });
  console.log({ newPizza });

  try {
    const { data } = await axios.post('/api/v1/admin/pizza/new', newPizza);
    console.log('CREATE_PIZZA', data);
    dispatch({ type: NEW_PIZZA_SUCCESS });
  } catch (error) {
    dispatch({
      type: NEW_PIZZA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
