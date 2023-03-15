import React from 'react';
import useInput from '../utils/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

const Registerscreen = () => {
  const dispatch = useDispatch();
  const { values, handleChange, resetValues } = useInput({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const registerState = useSelector((state) => state.userRegister);
  const { loading, success, error } = registerState;

  // useEffect(() => {
  //   if (success || localStorage.getItem('currentUser')) {
  //     window.location.href = '/';
  //   }
  // }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
    resetValues();
  };

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 shadow p-3 mb-5 bg-white rounded'>
          <h2 className='text-center' style={{ fontSize: '35px' }}>
            Register
          </h2>
          {loading && <Loader />}
          {success && <Success message={'Registered successfully'} />}
          {error && <Error message={error} />}
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='name'
              value={values.name}
              onChange={handleChange}
              className='form-control'
              required
            />
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
            <input
              type='password'
              name='passwordConfirm'
              placeholder='confirm password'
              value={values.passwordConfirm}
              onChange={handleChange}
              className='form-control'
              required
            />
            <button type='submit' className='btn'>
              REGISTER
            </button>
            <p>
              Already a user? <Link to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;
