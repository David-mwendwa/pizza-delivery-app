import React from 'react';

const Success = ({ message }) => {
  return (
    <div className='alert alert-success text-center' role='alert'>
      {message}
    </div>
  );
};

export default Success;
