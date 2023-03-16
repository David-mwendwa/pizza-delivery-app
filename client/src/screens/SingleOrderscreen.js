import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { getSingleOrder } from '../redux/actions/orderActions';

const SingleOrderscreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getSingleOrderState = useSelector((state) => state.getSingleOrder);
  const { loading, error, order } = getSingleOrderState;

  useEffect(() => {
    dispatch(getSingleOrder(id));
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
