import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPizzas } from '../redux/actions/pizzaActions';
import Pizza from '../components/Pizza';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Filter from '../components/Filter';

const Homescreen = () => {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div className='container'>
      {loading && <Loader />}
      <Filter />
      <div className='row justify-content-center'>
        {error ? (
          <Error message={'Something went wrong'} />
        ) : (
          pizzas.map((pizza) => (
            <div key={pizza._id} className='col-lg-4 col-md-6 col-sm-12'>
              <div>
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
