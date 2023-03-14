import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.userLogin);
  // console.log({ currentUser });

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
          {currentUser ? (
            <div className='dropdown mt-2'>
              <a
                style={{
                  color: 'black',
                  opacity: '.5',
                  textDecoration: 'none',
                }}
                className='dropdown-toggle'
                href='#!'
                role='button'
                id='dropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                {currentUser.name}
              </a>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                <a className='dropdown-item' href='/orders'>
                  Orders
                </a>
                <span
                  role='button'
                  className='dropdown-item'
                  onClick={() => dispatch(logout())}>
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <li className='nav-item'>
              <a className='nav-link' href='/login'>
                Login
              </a>
            </li>
          )}

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
