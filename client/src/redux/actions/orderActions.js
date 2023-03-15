import axios from 'axios';
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from '../constants/orderConstants';

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });

  const currentUser = getState().userLogin.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    const { data } = await axios.post('/api/v1/orders/placeorder', {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get orders for the currently logged in user
export const getMyOrders = () => async (dispatch) => {
  dispatch({ type: GET_MY_ORDERS_REQUEST });

  try {
    const { data } = await axios.get('/api/v1/orders/me');
    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
