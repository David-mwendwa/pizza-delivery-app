import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../MetaData';
import { deletePizza, getAllPizzas } from '../../redux/actions/pizzaActions';
import Loader from '../Loader';
import Error from '../Error';
import Success from '../Success';
import { PIZZA_RESET } from '../../redux/constants/pizzaConstants';

const PizzasList = () => {
  const dispatch = useDispatch();
  const { deleted } = useSelector((state) => state.pizza);
  const pizzasstate = useSelector((state) => state.pizzas);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch, pizzas]);

  const setPizzas = () => {
    const data = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Prices', field: 'prices', sort: 'asc' },
        { label: 'Variants', field: 'variants', sort: 'asc' },
        { label: 'Stock', field: 'stock', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    pizzas.forEach((pizza) => {
      data.rows.push({
        id: pizza._id,
        name: pizza.name,
        prices: JSON.stringify(pizza.prices[0]),
        variants: pizza.varients.join(', '),
        stock: 10, //default
        actions: (
          <div className='d-flex justify-content-around'>
            <Link to={`/admin/pizzas/${pizza._id}`} className='py-1 px-2'>
              <i className='fa fa-pencil-square' aria-hidden='true'></i>
            </Link>
            <button
              className='btn py-1 px-2 ml-2'
              onClick={() => handleDelete(pizza._id)}>
              <i className='fa fa-trash'></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const handleDelete = (id) => {
    dispatch(deletePizza(id));
  };

  useEffect(() => {
    setTimeout(() => {
      if (deleted) {
        dispatch({ type: PIZZA_RESET });
      }
    }, 2000);
  }, [dispatch, deleted]);

  return (
    <>
      {error && <Error message={error} />}
      {deleted && <Success message={'Pizza deleted successfully'} />}
      <MetaData title={'Pizzas List'} />
      <div>
        <h2
          className='text-center text-decoration-underline'
          style={{ fontSize: '35px', opacity: '.7' }}>
          ALL PIZZAS
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MDBDataTable
              data={setPizzas()}
              className='px-3'
              bordered
              striped
              hover
            />
          </>
        )}
      </div>
    </>
  );
};

export default PizzasList;
