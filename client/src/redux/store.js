/* eslint-disable no-unused-vars */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import devToolsEnhancer from 'remote-redux-devtools';
import { getAllPizzasReducer } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import { registerUserReducer } from './reducers/userReducer';

const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  registerUser: registerUserReducer,
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = { cartReducer: { cartItems } };
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
