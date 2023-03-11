import React from 'react';
import useInput from '../utils/useInput';

const Pizza = ({ pizza }) => {
  const { values, handleChange } = useInput({ quantity: 1, variant: 'small' });
  const { quantity, variant } = values;

  return (
    <div
      style={{ margin: '70px' }}
      className='shadow p-3 mb-5 bg-white rounded'>
      <h1>{pizza.name}</h1>
      <img
        src={pizza.image}
        className='img-fluid'
        alt={pizza.name}
        style={{ height: '200px', width: '200px' }}
      />
      <div className='flex-container'>
        <div className='m-1 w-100'>
          <p>Variants</p>
          <select
            className='form-control'
            name='variant'
            value={variant}
            onChange={handleChange}>
            {pizza.variants.map((variant) => (
              <option value={variant}>{variant}</option>
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
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex-container'>
        <div className='m-1 w-100'>
          <h1 className='m-1'>Price: Ksh.{pizza.prices[0][variant] * quantity}</h1>
        </div>
        <div className='m-1 w-100'>
          <button className='btn'>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
