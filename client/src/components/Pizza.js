import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import useInput from '../utils/useInput';

const Pizza = ({ pizza }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = useInput({ quantity: 1, variant: 'small' });
  const { quantity, variant } = values;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCart = () => {
    dispatch(addToCart(pizza, quantity, variant));
  };

  return (
    <div
      style={{ margin: '70px' }}
      className='shadow p-3 mb-5 bg-white rounded'>
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          className='img-fluid'
          alt={pizza.name}
          style={{ height: '200px', width: '200px' }}
        />
      </div>
      <div className='flex-container'>
        <div className='m-1 w-100'>
          <p>Variants</p>
          <select
            className='form-control'
            name='variant'
            value={variant}
            onChange={handleChange}>
            {pizza.varients.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
        <div className='m-1 w-100'>
          <p>Quantity</p>
          <select
            className='form-control'
            name='quantity'
            value={quantity}
            onChange={handleChange}>
            {[...Array(10).keys()].map((x, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex-container'>
        <div className='m-1 w-100'>
          <h1 className='m-1'>
            Price: Ksh.{pizza.prices[0][variant] * quantity}
          </h1>
        </div>
        <div className='m-1 w-100'>
          <button className='btn' onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            className='img-fluid'
            src={pizza.image}
            alt={pizza.name}
            style={{ height: '400px' }}
          />
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className='btn' onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pizza;
