import React, { useEffect } from 'react';
import useInput from '../utils/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';

const Loginscreen = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useInput({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/';
    }
  });

  const loginState = useSelector((state) => state.userLogin);
  const { loading, success, error } = loginState;
  console.log({ loginState });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 shadow p-3 mb-5 bg-white rounded'>
          <h2 className='text-center' style={{ fontSize: '35px' }}>
            LOGIN
          </h2>
          {loading && <Loader />}
          {success && <Success message={'Login successful'} />}
          {error && <Error message={error} />}
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='email'
              value={values.email}
              onChange={handleChange}
              className='form-control'
              required
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              value={values.password}
              onChange={handleChange}
              className='form-control'
              required
            />
            <button type='submit' className='btn'>
              LOGIN
            </button>
            <p>
              Are you new? <a href='/register'>Register</a>{' '}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
