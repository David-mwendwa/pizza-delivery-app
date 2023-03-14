import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartState = useSelector((state) => state.cartReducer);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow'>
      <a className='navbar-brand' href='/'>
        PIZZA DELIVERY
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarText'
        aria-controls='navbarText'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='/login'>
              Login
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/cart'>
              Cart{' '}
              <span className='badge badge-secondary'>
                {cartState.cartItems.length}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
