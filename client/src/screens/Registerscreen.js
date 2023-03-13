import React from 'react';
import useInput from '../utils/useInput';

const Registerscreen = () => {
  const { values, handleChange, resetValues } = useInput({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ values });

    resetValues();
  };

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <h2 className='text-center' style={{ fontSize: '35px' }}>
            Register
          </h2>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;
