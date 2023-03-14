import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({ subtotal }) => {
  const tokenHandler = (token) => {
    console.log({ token });
  };
  return (
    <div>
      <StripeCheckout
        amount={subtotal} // /100 if the subtotal is in Ksh
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51Imu8iKOyrEmScQWPjLK1SnUf9PbG8rllu8jmde1hV3ACQ6Qgmah6LUbIY6ihb89T4drjJvpcopn6V5HMwKvZEef00WiY46IBc'>
        <button className='btn'>Pay Now</button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
