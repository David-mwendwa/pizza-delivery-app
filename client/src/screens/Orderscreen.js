import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/actions/orderActions';
import Loader from '../components/Loader';
import Error from '../components/Error';

const ListOrders = () => {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.orders);
  const { loading, error, orders } = orderstate;

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: 'Order ID', field: 'id', sort: 'asc' },
        { label: 'Num of Items', field: 'numOfItems', sort: 'asc' },
        { label: 'Amount', field: 'amount', sort: 'asc' },
        { label: 'Status', field: 'status', sort: 'asc' },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `Kes ${order.orderAmount}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
      });
    });

    return data;
  };

  return (
    <>
      {error && <Error message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2
            className='text-center text-decoration-underline'
            style={{ fontSize: '25px', opacity: '.7' }}>
            MY ORDERS ({orders.length})
          </h2>
          <MDBDataTable
            data={setOrders()}
            className='px-3'
            bordered
            striped
            hover
          />
        </div>
      )}
    </>
  );
};

export default ListOrders;
