import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/actions/orderActions';

const Orderscreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  });

  return (
    <div>
      <h2 style={{ fontSize: '35px' }}>My Orders</h2>
    </div>
  );
};

export default Orderscreen;
