/* eslint-disable no-unused-vars */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import devToolsEnhancer from 'remote-redux-devtools';
import {
  addNewPizzaReducer,
  getAllPizzasReducer,
  getPizzaDetailsReducer,
  pizzaActionsReducer,
  pizzaDeleteReducer,
  pizzaUpdateReducer,
} from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import {
  getMyOrdersReducer,
  getSingleOrderReducer,
  placeOrderReducer,
} from './reducers/orderReducer';
import {
  createOneReducer,
  deleteOneReducer,
  getManyReducer,
  getOneReducer,
  updateOneReducer,
} from './reducers/actionReducer';

const finalReducer = combineReducers({
  getMany: getManyReducer,
  getOne: getOneReducer,
  createOne: createOneReducer,
  updateOne: updateOneReducer,
  deleteOne: deleteOneReducer,
  getAllPizzas: getAllPizzasReducer,
  getPizzaDetails: getPizzaDetailsReducer,
  addNewPizza: addNewPizzaReducer,
  pizzaUpdate: pizzaUpdateReducer,
  pizzaDelete: pizzaDeleteReducer,
  pizzaActions: pizzaActionsReducer,
  cartReducer: cartReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  placeOrder: placeOrderReducer,
  getMyOrders: getMyOrdersReducer,
  getSingleOrder: getSingleOrderReducer,
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

const initialState = { cartReducer: { cartItems }, userLogin: { currentUser } };
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
