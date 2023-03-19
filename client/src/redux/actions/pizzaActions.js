import axios from 'axios';
import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  NEW_PIZZA_FAIL,
  NEW_PIZZA_REQUEST,
  NEW_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  GET_PIZZA_DETAILS_FAIL,
  GET_PIZZA_DETAILS_REQUEST,
  GET_PIZZA_DETAILS_SUCCESS,
  UPDATE_PIZZA_REQUEST,
  UPDATE_PIZZA_SUCCESS,
  UPDATE_PIZZA_FAIL,
} from '../constants/pizzaConstants';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/pizzas');
    dispatch({ type: GET_PIZZAS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_PIZZAS_FAIL, payload: error });
  }
};

export const getPizzaDetails = (id) => async (dispatch) => {
  dispatch({ type: GET_PIZZA_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/pizzas/${id}`);
    dispatch({ type: GET_PIZZA_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_PIZZA_DETAILS_FAIL, payload: error });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  dispatch({ type: GET_PIZZAS_REQUEST });
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

  try {
    await axios.post('/api/v1/admin/pizza/new', newPizza);
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

// delete Pizza
export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PIZZA_REQUEST });
    await axios.delete(`/api/v1/admin/pizza/${id}`);
    dispatch({ type: DELETE_PIZZA_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PIZZA_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update pizza
export const updatePizza = (id, newDetails) => async (dispatch) => {
  console.log({ id, newDetails });
  try {
    dispatch({ type: UPDATE_PIZZA_REQUEST });
    await axios.patch(`/api/v1/admin/pizza/${id}`, newDetails);
    dispatch({ type: UPDATE_PIZZA_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_PIZZA_FAIL,
      payload: error.response.data.message,
    });
  }
};
