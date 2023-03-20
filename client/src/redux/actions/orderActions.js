import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/orderConstants';

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  const currentUser = getState().userLogin.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    const { data } = await axios.post('/api/v1/orders/placeorder', {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get orders for the currently logged in user
export const getMyOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDERS_REQUEST });

  try {
    const { data } = await axios.get('/api/v1/orders/me');
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch({ type: ORDERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/v1/admin/orders`);
    dispatch({ type: ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = (id) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/api/v1/admin/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrder = (id, orderStatus) => async (dispatch) => {
  dispatch({ type: ORDER_UPDATE_REQUEST });

  try {
    const { data } = await axios.patch(
      `/api/v1/admin/orders/${id}`,
      orderStatus
    );
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: ORDER_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/api/v1/admin/orders/${id}`);
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
