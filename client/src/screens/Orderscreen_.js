import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/actions/orderActions';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Orderscreen = () => {
  const dispatch = useDispatch();
  const getMyOrdersState = useSelector((state) => state.getMyOrders);
  const { loading, error, orders } = getMyOrdersState;

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <h2 className='text-center' style={{ fontSize: '35px' }}>
        My Orders ({orders.length})
      </h2>
      <div className='row justify-content-center '>
        {orders &&
          orders.map((order) => (
            <div className='col-md-8 bg-light shadow p-3 mb-5 bg-white rounded text-muted'>
              <div className='flex-container'>
                <div className='text-left w-100'>
                  <h2 style={{ fontSize: '25px' }}>Items</h2>
                  {order.orderItems.map((item) => (
                    <div>
                      <p>
                        {item.name} [{item.variant}] * {item.quantity} ={' '}
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='text-left w-100'>
                  <h2 style={{ fontSize: '25px' }}>Address</h2>
                  <p>Street: {order.shippingAddress.street}</p>
                  <p>City: {order.shippingAddress.city}</p>
                  <p>Country: {order.shippingAddress.country}</p>
                  <p>Pincode: {order.shippingAddress.pincode || 'N/A'}</p>
                </div>
                <div className='text-left w-100'>
                  <h2 style={{ fontSize: '25px' }}>Address</h2>
                  <p>Order Amount: {order.orderAmount}</p>
                  <p>
                    Date: <Moment format='YYYY-MM-DD'>{order.createAt}</Moment>
                  </p>
                  <p>Transaction ID: {order.transactionId}</p>
                  <p>Order ID: {order._id}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Orderscreen;
