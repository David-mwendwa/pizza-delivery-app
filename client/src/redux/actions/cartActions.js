import { ADD_TO_CART } from '../constants/cartConstants';

export const addToCart =
  (pizza, quantity, variant) => async (dispatch, getState) => {
    let cartItem = {
      _id: pizza.id,
      name: pizza.name,
      image: pizza.image,
      variant: variant,
      quantity: quantity,
      prices: pizza.prices,
      price: pizza.prices[0][variant] * quantity,
    };

    dispatch({ type: ADD_TO_CART, payload: cartItem });

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
