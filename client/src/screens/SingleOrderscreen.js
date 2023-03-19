import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { getOrder } from '../redux/actions/orderActions';

const SingleOrderscreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      {order && (
        <div>
          <h2
            className='text-center text-decoration-underline'
            style={{ fontSize: '25px', opacity: '.7' }}>
            Order #{order._id}
          </h2>
          <p>{JSON.stringify(order)}</p>
        </div>
      )}
    </div>
  );
};

export default SingleOrderscreen;
