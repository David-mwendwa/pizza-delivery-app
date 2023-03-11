import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPizzas } from '../actions/pizzaActions';
import Pizza from '../components/Pizza';
import pizzas from '../pizzadata';

const Homescreen = () => {
  const dispatch = useDispatch();
  const getPizzas = useSelector((state) => state.getAllPizzas);
  console.log({ pizzassss: getPizzas.pizzas });

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <div className='row'>
        {pizzas.map((pizza) => (
          <div className='col-md-4'>
            <div>
              <Pizza pizza={pizza} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homescreen;
