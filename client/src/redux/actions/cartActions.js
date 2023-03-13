import { ADD_TO_CART, DELETE_FROM_CART } from '../constants/cartConstants';

export const addToCart =
  (pizza, quantity, variant) => async (dispatch, getState) => {
    let cartItem = {
      _id: pizza.id,
      name: pizza.name,
      image: pizza.image,
      variant: variant,
      quantity: Number(quantity),
      prices: pizza.prices,
      price: pizza.prices[0][variant] * quantity,
    };

    if (cartItem.quantity > 10) {
      alert('You cannot add more than 10 quantities');
    } else {
      if (cartItem.quantity < 1) {
        dispatch({ type: DELETE_FROM_CART, payload: pizza });
      } else dispatch({ type: ADD_TO_CART, payload: cartItem });
    }

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: DELETE_FROM_CART, payload: pizza });

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem('setItem', JSON.stringify(cartItems));
};