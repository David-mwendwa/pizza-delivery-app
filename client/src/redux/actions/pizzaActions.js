import axios from 'axios';
import {
  PIZZAS_FAIL,
  PIZZAS_REQUEST,
  PIZZAS_SUCCESS,
  PIZZA_CREATE_FAIL,
  PIZZA_CREATE_REQUEST,
  PIZZA_CREATE_SUCCESS,
  PIZZA_DELETE_FAIL,
  PIZZA_DELETE_REQUEST,
  PIZZA_DELETE_SUCCESS,
  PIZZA_DETAILS_FAIL,
  PIZZA_DETAILS_REQUEST,
  PIZZA_DETAILS_SUCCESS,
  PIZZA_UPDATE_REQUEST,
  PIZZA_UPDATE_SUCCESS,
  PIZZA_UPDATE_FAIL,
} from '../constants/pizzaConstants';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: PIZZAS_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    dispatch({ type: PIZZAS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PIZZAS_FAIL, payload: error });
  }
};

export const getPizzaDetails = (id) => async (dispatch) => {
  dispatch({ type: PIZZA_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/pizzas/${id}`);
    dispatch({ type: PIZZA_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PIZZA_DETAILS_FAIL, payload: error });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  dispatch({ type: PIZZAS_REQUEST });
  let filteredPizzas = null;
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    console.log(data);
    filteredPizzas = data.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    if (category !== 'all') {
      filteredPizzas = data.data.filter(
        (pizza) => pizza.category.toLowerCase() === category.toLowerCase()
      );
    }
    dispatch({ type: PIZZAS_SUCCESS, payload: filteredPizzas });
  } catch (error) {
    dispatch({
      type: PIZZAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewPizza = (newPizza) => async (dispatch) => {
  dispatch({ type: PIZZA_CREATE_REQUEST });

  try {
    await axios.post('/api/v1/admin/pizza/new', newPizza);
    dispatch({ type: PIZZA_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PIZZA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete Pizza
export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: PIZZA_DELETE_REQUEST });
    await axios.delete(`/api/v1/admin/pizza/${id}`);
    dispatch({ type: PIZZA_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PIZZA_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update pizza
export const updatePizza = (id, newDetails) => async (dispatch) => {
  try {
    dispatch({ type: PIZZA_UPDATE_REQUEST });
    await axios.patch(`/api/v1/admin/pizza/${id}`, newDetails);
    dispatch({ type: PIZZA_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PIZZA_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
