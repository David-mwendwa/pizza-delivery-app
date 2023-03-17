import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.userLogin);
  // console.log({ currentUser });

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow'>
      <Link className='navbar-brand' to='/'>
        PIZZA DELIVERY
      </Link>
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
              <Link
                style={{
                  color: 'black',
                  opacity: '.5',
                  textDecoration: 'none',
                }}
                className='dropdown-toggle'
                to=''
                role='button'
                id='dropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                {currentUser.name}
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                <Link className='dropdown-item' to='/orders'>
                  Orders
                </Link>
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
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </li>
          )}

          <li className='nav-item'>
            <Link className='nav-link' to='/cart'>
              Cart{' '}
              <span className='badge badge-secondary'>
                {cartState.cartItems.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
