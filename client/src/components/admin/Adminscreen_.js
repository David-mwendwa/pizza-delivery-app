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
    <>
      <h1 className=' mb-4 text-center text-muted'>ADMIN PANEL</h1>
      <Tabs
        defaultActiveKey='users'
        id='justify-tab-example'
        className='mb-3'
        justify>
        <Tab eventKey='users' title='USERS'>
          <UsersList />
        </Tab>
        <Tab eventKey='orders' title='ORDERS'>
          <OrdersList />
        </Tab>
        <Tab eventKey='pizzas' title='PIZZAS'>
          <PizzasList />
        </Tab>
        <Tab eventKey='createpizza' title='CREATE PIZZA'>
          <NewPizza />
        </Tab>
      </Tabs>
    </>
  );
};

export default Adminscreen;
