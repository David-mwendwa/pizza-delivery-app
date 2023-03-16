import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../utils/useInput';

const Filter = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useInput({
    seachPizzas: '',
  });

  return (
    <>
      <div class='row d-flex justify-content-around shadow p-3 mb-5 bg-white rounded my-3'>
        <div className='col-md-2'>
          <input
            type='text'
            className='form-control'
            name='seachPizzas'
            value={values.seachPizzas}
            onChange={handleChange}
            placeholder='search pizzas'
          />
        </div>
        <div className='col-md-2'>
          <select className='form-control ' value={''} onChange={handleChange}>
            <option value='all'>All</option>
            <option value='veg'>Veg</option>
            <option value='nonveg'>Non-veg</option>
          </select>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-secondary'>FILTER</button>
        </div>
      </div>
    </>
  );
};

export default Filter;
