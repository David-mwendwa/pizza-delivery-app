import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOrder,
  getOrders,
  resetOrder,
  updateOrder,
} from '../../redux/actions/orderActions';
import Loader from '../Loader';
import Error from '../Error';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Success from '../Success';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { updated, deleted } = useSelector((state) => state.order);
  const orderstate = useSelector((state) => state.orders);
  const { loading, error, orders } = orderstate;

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orderStatus, setOrderStatus] = useState('');
  const [orderId, setOrderId] = useState('');

  const handleUpdate = () => {
    if (orderId && orderStatus) {
      dispatch(updateOrder(orderId, { orderStatus }));
      handleClose();
      window.location.reload();
    }
  };

  const handleActionBtn = (id) => {
    handleShow();
    setOrderId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) {
      dispatch(deleteOrder(id));
    }
  };

  // TODO: inspect if this hook functions
  useEffect(() => {
    setTimeout(() => {
      if (updated || deleted) {
        console.log({ updated, deleted });
        dispatch(resetOrder());
        window.location.reload();
      }
    }, 2000);
  }, [dispatch, updated, deleted]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: 'Order ID', field: 'id', sort: 'asc' },
        { label: 'User ID', field: 'userId', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Amount', field: 'amount', sort: 'asc' },
        { label: 'Date', field: 'date', sort: 'asc' },
        { label: 'Status', field: 'status', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        userId: order.userId,
        email: order.email,
        amount: `Kes ${order.orderAmount}`,
        status:
          order.orderStatus && /delivered/i.test(String(order.orderStatus)) ? (
            <p className='text-success'>{order.orderStatus}</p>
          ) : order.orderStatus &&
            /shipping/i.test(String(order.orderStatus)) ? (
            <p className='text-primary'>{order.orderStatus}</p>
          ) : (
            <p className='text-danger'>{order.orderStatus}</p>
          ),
        date: <Moment format='YYYY-MM-DD'>{order.paidAt}</Moment>,
        actions: (
          <>
            <Link
              to=''
              className='py-1 px-2'
              onClick={() => handleActionBtn(order._id)}>
              <i className='fa fa-pencil-square' aria-hidden='true'></i>
            </Link>
            <button
              className='btn py-1 px-2 ml-2'
              onClick={() => handleDelete(order._id)}>
              <i className='fa fa-trash'></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      {error && <Error message={error} />}
      {updated && <Success message={'Order updated successfully'} />}
      {deleted && <Success message={'Order deleted successfully'} />}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* <h2
            className='text-center text-decoration-underline'
            style={{ fontSize: '25px', opacity: '.7' }}>
            MY ORDERS ({orders.length})
          </h2> */}
          <MDBDataTable
            data={setOrders()}
            className='px-3'
            bordered
            striped
            hover
          />
        </div>
      )}
      <Modal size='sm' show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Select
              name='orderStatus'
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}>
              <option>Change order status</option>
              <option value='processing'>Processing</option>
              <option value='shipping'>Shipping</option>
              <option value='delivered'>Delivered</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant='secondary' onClick={handleClose}>
            CLOSE
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersList;
