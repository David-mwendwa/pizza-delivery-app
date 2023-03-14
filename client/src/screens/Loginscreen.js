import React, { useEffect } from 'react';
import useInput from '../utils/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';

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

  const userLoginState = useSelector((state) => state.userLogin);
  //const {  } = userLoginState;
  console.log({ userLoginState });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <h2 className='text-center' style={{ fontSize: '35px' }}>
            LOGIN
          </h2>
          {/* {error ? (
            <div class='alert alert-danger text-center'>{error}</div>
          ) :
            success && success ? (
            <div class='alert alert-success text-center'>{success}</div>
            ) :
              (
            <></>
          )} */}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
