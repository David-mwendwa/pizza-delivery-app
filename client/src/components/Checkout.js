import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../redux/actions/orderActions';
import Error from './Error';
import Success from './Success';
import Loader from './Loader';

const Checkout = ({ subtotal }) => {
  const dispatch = useDispatch();
  const placeOrderState = useSelector((state) => state.placeOrder);
  const { loading, success, error } = placeOrderState;

  const tokenHandler = (token) => {
    console.log({ token });
    dispatch(placeOrder(token, subtotal));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      {success && <Success message={'Your order placed successfully'} />}

      <StripeCheckout
        amount={subtotal} // /100 if the subtotal is in Ksh
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51Imu8iKOyrEmScQWPjLK1SnUf9PbG8rllu8jmde1hV3ACQ6Qgmah6LUbIY6ihb89T4drjJvpcopn6V5HMwKvZEef00WiY46IBc'>
        <button className='btn btn-info'>Pay Now</button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
