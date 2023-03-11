import React from 'react';

const Pizza = ({ pizza }) => {
  return (
    <div>
      <h1>{pizza.name}</h1>
      <img
        src={pizza.image}
        className='img-fluid'
        alt={pizza.name}
        style={{ height: '200px', width: '200px' }}
      />
      <div className='flex-container'>
        <div className='w-100'>
          <p>Variants</p>
          <select>
            {pizza.variants.map((variant) => (
              <option value={variant}>{variant}</option>
            ))}
          </select>
        </div>
        <div className='w-100'>
          <p>Quantity</p>
          <select>
            {[...Array(10).keys()].map((x, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
