import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/actions/orderActions';

const Orderscreen = () => {
  const dispatch = useDispatch();
  const getMyOrdersState = useSelector((state) => state.getMyOrders);
  const { loading, error, orders } = getMyOrdersState;

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h2 style={{ fontSize: '35px' }}>My Orders ({orders.length})</h2>
    </div>
  );
};

export default Orderscreen;
