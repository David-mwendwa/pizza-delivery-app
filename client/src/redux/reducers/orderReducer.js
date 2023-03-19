import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
} from '../constants/orderConstants';

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case PLACE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ordersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
    case GET_MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case ORDERS_SUCCESS:
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDERS_FAIL:
    case GET_MY_ORDERS_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_SINGLE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case GET_SINGLE_ORDER_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
