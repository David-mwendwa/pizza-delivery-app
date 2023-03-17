import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const Adminscreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = '/';
    }
  });

  return (
    <div>
      <h1 className='text-center' style={{ fontSize: '35px' }}>
        Admin Panel
      </h1>
      <ul className='adminfunctions d-flex justify-content-around'>
        <li>
          <Link to='/admin/users'>Users List</Link>
        </li>
        <li>
          <Link to='/admin/orders'>Orders List</Link>
        </li>
        <li>
          <Link to='/admin/pizzas'>Pizzas List</Link>
        </li>
        <li>
          <Link to='/admin/addPizza'>Add new pizza</Link>
        </li>
      </ul>
    </div>
  );
};

export default Adminscreen;
