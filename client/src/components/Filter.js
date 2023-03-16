import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterPizzas } from '../redux/actions/pizzaActions';
import useInput from '../utils/useInput';

const Filter = () => {
  const dispatch = useDispatch();

  const { values, handleChange, resetValues } = useInput({
    searchKey: '',
    category: '',
  });
  const { searchKey, category } = values;

  const handleSearch = () => {
    dispatch(filterPizzas(searchKey, category));
    resetValues();
  };

  return (
    <>
      <div className='row d-flex justify-content-around shadow p-3 mb-5 bg-white rounded my-3'>
        <div className='col-md-2'>
          <input
            type='text'
            className='form-control'
            name='searchKey'
            value={searchKey}
            onChange={handleChange}
            placeholder='search pizzas'
          />
        </div>
        <div className='col-md-2'>
          <select
            className='form-control'
            name='category'
            value={category}
            onChange={handleChange}>
            <option value='all'>All</option>
            <option value='veg'>Veg</option>
            <option value='nonveg'>Non-veg</option>
          </select>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-secondary' onClick={handleSearch}>
            FILTER
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
