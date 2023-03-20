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
} from '../constants/orderConstants';

export const ordersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ORDERS_SUCCESS:
    case MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDERS_FAIL:
    case MY_ORDERS_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const orderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, created: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
    case ORDER_CREATE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
