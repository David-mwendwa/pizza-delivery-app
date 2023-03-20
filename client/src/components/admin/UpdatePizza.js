/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../../utils/useInput';
import Error from '../Error';
import Success from '../Success';
import Loader from '../Loader';
import { getPizzaDetails, updatePizza } from '../../redux/actions/pizzaActions';
import { PIZZA_RESET } from '../../redux/constants/pizzaConstants';

const UpdatePizza = () => {
  const [name, setName] = useState();
  const [small, setSmall] = useState();
  const [medium, setMedium] = useState();
  const [large, setLarge] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, pizza, updated } = useSelector((state) => state.pizza);

  useEffect(() => {
    if (pizza) {
      if (pizza._id === id) {
        setName(pizza.name);
        setSmall(pizza.prices[0]['small']);
        setMedium(pizza.prices[0]['medium']);
        setLarge(pizza.prices[0]['large']);
        setDescription(pizza.description);
        setCategory(pizza.category);
        // setImage(pizza.image);
      } else dispatch(getPizzaDetails(id));
    } else dispatch(getPizzaDetails(id));
  }, [dispatch, pizza, id]);

  const newDetails = {
    name,
    varients: ['small', 'medium', 'large'],
    prices: [{ small, medium, large }],
    category,
    description,
    image,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePizza(id, newDetails));
    setTimeout(() => {
      navigate('/admin/pizzas');
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      if (updated) {
        dispatch({ type: PIZZA_RESET });
      }
    }, 2000);
  }, [dispatch, updated]);

  return (
    <>
      {loading && <Loader />}
      {updated && <Success message={'Pizza updated successfully'} />}
      <div className='row d-flex justify-content-center align-items-center h-100'>
        <div className='col-xl-9'>
          <h1 className=' mb-4 text-center'>UPDATE PIZZA</h1>
          <div className='card' style={{ borderRadius: '15px' }}>
            {/* {error && <Error message={error} />} */}
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setSmall(e.target.value)}
                    required
                  />
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    placeholder='Medium variant'
                    name='medium'
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    required
                  />
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    placeholder='Large variant'
                    name='large'
                    value={large}
                    onChange={(e) => setLarge(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}>
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
                    // onChange={(e) => setImage(e.target.value)}
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
                  UPDATE PIZZA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePizza;
