import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewPizza from './NewPizza';
import UsersList from './UsersList';
import OrdersList from './OrdersList';
import PizzasList from './PizzasList';

const Adminscreen = () => {
  const { currentUser } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = '/';
    }
  });

  return (
    <Tabs
      defaultActiveKey='users'
      id='justify-tab-example'
      className='mb-3'
      justify>
      <Tab eventKey='users' title='Users'>
        <UsersList />
      </Tab>
      <Tab eventKey='orders' title='Orders'>
        <OrdersList />
      </Tab>
      <Tab eventKey='pizzas' title='Pizzas'>
        <PizzasList />
      </Tab>
      <Tab eventKey='addNewPizza' title='Add new pizza'>
        <NewPizza />
      </Tab>
    </Tabs>
  );
};

export default Adminscreen;
