import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/actions/cartActions';

const Cartscreen = () => {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;

  const subtotal = cartItems.reduce((x, item) => x + item.price, 0);

  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h2 style={{ fontSize: '40px' }}>My Cart</h2>
          {cartItems.map((item) => (
            <div className='flex-container'>
              <div className='text-left m-1 w-100'>
                <h1>
                  {item.name} [{item.variant}]
                </h1>
                <h1>
                  Pirce: {item.quantity} * {item.prices[0][item.variant]} ={' '}
                  {item.price}
                </h1>
                <h1 style={{ display: 'inline' }}>Quantity: </h1>
                <i
                  className='fa fa-plus'
                  aria-hidden='true'
                  onClick={() =>
                    dispatch(addToCart(item, item.quantity + 1, item.variant))
                  }></i>
                <b>{item.quantity}</b>
                <i
                  className='fa fa-minus'
                  aria-hidden='true'
                  onClick={() =>
                    dispatch(addToCart(item, item.quantity - 1, item.variant))
                  }></i>
                <hr />
              </div>
              <div className='m-1 w-100'>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ height: '80px', width: '80px' }}
                />
              </div>
              <div className='m-1 w-100'>
                <i
                  className='fa fa-trash mt-5'
                  aria-hidden='true'
                  onClick={() => dispatch(deleteFromCart(item))}></i>
              </div>
            </div>
          ))}
        </div>
        <div className='col-md-4 text-right'>
          <h2 style={{ fontSize: '45px' }}>SubTotal: {subtotal}/-</h2>
          <button className='btn'>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cartscreen;
