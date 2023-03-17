import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { addToCart, deleteFromCart } from '../redux/actions/cartActions';

const Cartscreen = () => {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;

  const subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const shippingFee = subtotal * (5 / 100);

  return (
    <>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12'>
            <div
              className='card card-registration card-registration-2'
              style={{ borderRadius: '15px' }}>
              <div className='card-body p-0'>
                <div className='row g-0'>
                  <div className='col-lg-8'>
                    <div className='p-5'>
                      <div className='d-flex justify-content-between align-items-center mb-5'>
                        <h1 className='fw-bold mb-0 text-black'>
                          Shopping Cart
                        </h1>
                        <h6 className='mb-0 text-muted'>
                          {cartItems.length} items
                        </h6>
                      </div>
                      <hr className='my-4' />

                      {cartItems.map((item) => (
                        <>
                          <div className='row mb-4 d-flex justify-content-between align-items-center'>
                            <div className='col-md-2 col-lg-2 col-xl-2'>
                              <img
                                className='img-fluid rounded-3'
                                src={item.image}
                                alt={item.name}
                              />
                            </div>
                            <div className='col-md-3 col-lg-3 col-xl-3'>
                              <h6 className='text-muted'>{item.name}</h6>
                              <h6 className='text-black mb-0'>
                                Variant:{' '}
                                <span className='text-muted'>
                                  {item.variant}
                                </span>
                              </h6>
                            </div>
                            <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                              <i
                                role='button'
                                className='fa fa-minus'
                                onClick={() =>
                                  dispatch(
                                    addToCart(
                                      item,
                                      item.quantity - 1,
                                      item.variant
                                    )
                                  )
                                }></i>

                              <input
                                id='quantity'
                                min='0'
                                name='quantity'
                                value={item.quantity}
                                type='number'
                                className='form-control form-control-sm'
                              />

                              <i
                                role='button'
                                className='fa fa-plus'
                                onClick={() =>
                                  dispatch(
                                    addToCart(
                                      item,
                                      item.quantity + 1,
                                      item.variant
                                    )
                                  )
                                }></i>
                            </div>
                            <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                              <h6 className='mb-0'>Kes {item.price}</h6>
                            </div>
                            <div
                              className='col-md-1 col-lg-1 col-xl-1 text-end'
                              onClick={() => dispatch(deleteFromCart(item))}>
                              <a href='#!' className='text-muted'>
                                <i className='fa fa-times'></i>
                              </a>
                            </div>
                          </div>

                          <hr className='my-4' />
                        </>
                      ))}

                      <div className='pt-5'>
                        <h6 className='mb-0'>
                          <Link to='/' className='text-body'>
                            <i className='fas fa-long-arrow-alt-left me-2'></i>
                            Back to shop
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 bg-grey'>
                    <div className='p-5'>
                      <h3 className='fw-bold mb-5 mt-2 pt-1'>Summary</h3>
                      <hr className='my-4' />

                      <div className='d-flex justify-content-between mb-4'>
                        <h5 className='text-uppercase'>
                          items {cartItems.length}
                        </h5>
                        <h5>Kes {subtotal.toFixed(2)}</h5>
                      </div>

                      <h5 className='text-uppercase mb-3'>Shipping</h5>

                      <div className='mb-4 pb-2'>
                        <select
                          name='shippingFee'
                          value={shippingFee}
                          className='form-control'>
                          <option name='StandardDelivery'>
                            Standard-Delivery- Kes {shippingFee}
                          </option>
                        </select>
                      </div>

                      <hr className='my-4' />

                      <div className='d-flex justify-content-between mb-5'>
                        <h5 className='text-uppercase'>Total price</h5>
                        <h5>Kes {(subtotal + shippingFee).toFixed(2)}</h5>
                      </div>

                      <Checkout subtotal={subtotal} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartscreen;
