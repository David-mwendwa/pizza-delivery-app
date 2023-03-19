import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPizza } from '../../redux/actions/pizzaActions';
import useInput from '../../utils/useInput';
import Error from '../Error';
import Success from '../Success';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import { PIZZA_RESET } from '../../redux/constants/pizzaConstants';

const NewPizza = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, created, error } = useSelector((state) => state.pizza);

  const { values, handleChange, resetValues } = useInput({
    name: '',
    small: '',
    medium: '',
    large: '',
    description: '',
    category: '',
    image: '',
  });
  const { name, small, medium, large, description, category, image } = values;

  const newPizza = {
    name,
    varients: ['small', 'medium', 'large'],
    prices: [{ small, medium, large }],
    category,
    description,
    image,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPizza(newPizza));
    resetValues();
    setTimeout(() => {
      navigate('/admin/pizzas');
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      if (created) {
        dispatch({ type: PIZZA_RESET });
      }
    }, 2000);
  }, [dispatch, created]);

  return (
    <>
      {loading && <Loader />}
      <div className='row d-flex justify-content-center align-items-center h-100'>
        <div className='col-xl-9'>
          <h1 className=' mb-4 text-center'>Add New Pizza</h1>
          <div className='card' style={{ borderRadius: '15px' }}>
            {created && <Success message='new pizza added successfully' />}
            {error && <Error message={error} />}
            <div className='card-body'>
              <div className='row align-items-center pt-4 pb-3'>
                <div className='col-md-3 ps-5'>
                  <h6 className='mb-0'>Name</h6>
                </div>
                <div className='col-md-9 pe-5'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <hr className='mx-n3' />

              <div className='row align-items-center py-3'>
                <div className='col-md-3 ps-5'>
                  <h6 className='mb-0'>Prices</h6>
                </div>
                <div className='col-md-9 pe-5'>
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    placeholder='Small variant'
                    name='small'
                    value={small}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    placeholder='Medium variant'
                    name='medium'
                    value={medium}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    placeholder='Large variant'
                    name='large'
                    value={large}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <hr className='mx-n3' />

              <div className='row align-items-center py-3'>
                <div className='col-md-3 ps-5'>
                  <h6 className='mb-0'>Description</h6>
                </div>
                <div className='col-md-9 pe-5'>
                  <textarea
                    className='form-control'
                    name='description'
                    value={description}
                    onChange={handleChange}
                    rows='3'
                    placeholder='Add pizza description'
                    required></textarea>
                </div>
              </div>

              <hr className='mx-n3' />

              <div className='row align-items-center py-3'>
                <div className='col-md-3 ps-5'>
                  <h6 className='mb-0'>Category</h6>
                </div>
                <div className='col-md-9 pe-5'>
                  <select
                    className='form-control'
                    name='category'
                    value={category}
                    onChange={handleChange}>
                    <option value=''>Select</option>
                    <option value='veg'>Veg</option>
                    <option value='nonveg'>Non-veg</option>
                  </select>
                </div>
              </div>

              <hr className='mx-n3' />

              <div className='row align-items-center py-3'>
                <div className='col-md-3 ps-5'>
                  <h6 className='mb-0'>Upload Image</h6>
                </div>
                <div className='col-md-9 pe-5'>
                  <input
                    className='form-control form-control-lg'
                    id='formFileLg'
                    type='file'
                    name='image'
                    value={image}
                    onChange={handleChange}
                  />
                  <div className='small text-muted mt-2'>
                    Upload pizza image file. Max file size 50 MB
                  </div>
                </div>
              </div>

              <hr className='mx-n3' />

              <div className='px-5 py-4'>
                <button
                  onClick={handleSubmit}
                  type='submit'
                  className='btn btn-primary btn-lg'>
                  ADD PIZZA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPizza;
