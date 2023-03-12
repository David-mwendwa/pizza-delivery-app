import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPizzas } from '../redux/actions/pizzaActions';
import Pizza from '../components/Pizza';
// import pizzas from '../pizzadata';

const Homescreen = () => {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <div className='row justify-content-center'>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          pizzas.map((pizza) => (
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div key={pizza._id}>
                <Pizza pizza={pizza} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;
