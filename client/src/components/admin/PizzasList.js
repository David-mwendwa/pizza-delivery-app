import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../MetaData';
import { getAllPizzas } from '../../redux/actions/pizzaActions';
import Loader from '../Loader';
import Error from '../Error';

const PizzasList = () => {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  console.log({ pizzas });

  const setPizzas = () => {
    const data = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Prices', field: 'prices', sort: 'asc' },
        { label: 'Varients', field: 'varients', sort: 'asc' },
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
        varients: pizza.varients.join(', '),
        stock: 10, //default
        actions: (
          <div className='d-flex justify-content-around'>
            <Link to={`/admin/pizzas/${pizza._id}`} className='py-1 px-2'>
              <i class='fa fa-pencil-square' aria-hidden='true'></i>
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
    console.log(id);
    // dispatch(deletePizza(id));
  };

  return (
    <>
      {error && <Error message={error} />}
      <MetaData title={'Pizzas List'} />
      <div className='row'>
        <div className='col-12 col-md-10'>
          <>
            <h1 style={{ fontSize: '35px' }} className='my-5 text-center'>
              All Pizzas
            </h1>

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
          </>
        </div>
      </div>
    </>
  );
};

export default PizzasList;
