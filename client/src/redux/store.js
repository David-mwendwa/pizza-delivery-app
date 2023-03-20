/* eslint-disable no-unused-vars */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import devToolsEnhancer from 'remote-redux-devtools';
import { pizzaReducer, pizzasReducer } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import {
  userLoginReducer,
  userReducer,
  userRegisterReducer,
  usersReducer,
} from './reducers/userReducer';
import { orderReducer, ordersReducer } from './reducers/orderReducer';

const finalReducer = combineReducers({
  pizzas: pizzasReducer,
  pizza: pizzaReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  users: usersReducer,
  user: userReducer,
  orders: ordersReducer,
  order: orderReducer,
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

const initialState = { cart: { cartItems }, userLogin: { currentUser } };
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

// create store using configureStore
// const storee = configureStore({
//   middleware: [thunk],
//   reducer: finalReducer,
//   initialState,
//   enhancers: [devToolsEnhancer({ realtime: true })],
// });

export default store;
