import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './utils/Protected';
import Adminscreen from './screens/Adminscreen';
import Cartscreen from './screens/Cartscreen';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import Orderscreen from './screens/Orderscreen';
import Registerscreen from './screens/Registerscreen';
import SingleOrderscreen from './screens/SingleOrderscreen';
import UsersList from './screens/admin/UsersList';
import OrdersList from './screens/admin/UsersList';
import PizzasList from './screens/admin/PizzasList';
import AddPizza from './screens/admin/AddPizza';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <div className='container my-4'>
          <Routes>
            <Route path='/' element={<Homescreen />} exact />
            <Route path='/cart' element={<Cartscreen />} exact />
            <Route path='/register' element={<Registerscreen />} exact />
            <Route path='/login' element={<Loginscreen />} exact />
            <Route path='/orders' element={<Orderscreen />} exact />
            <Route path='/orders/:id' element={<SingleOrderscreen />} exact />
          </Routes>
          <Routes>
            <Route
              path='/admin'
              element={
                <Protected>
                  <Adminscreen isAdmin={true} />
                </Protected>
              }
              exact
            />
            <Route
              path='/admin/pizzas'
              element={
                <Protected>
                  <PizzasList isAdmin={true} />
                </Protected>
              }
              exact
            />
            <Route
              path='/admin/pizzas/new'
              element={
                <Protected>
                  <AddPizza isAdmin={true} />
                </Protected>
              }
              exact
            />
            <Route
              path='/admin/orders'
              element={
                <Protected>
                  <OrdersList isAdmin={true} />
                </Protected>
              }
              exact
            />
            <Route
              path='/admin/users'
              element={
                <Protected>
                  <UsersList isAdmin={true} />
                </Protected>
              }
              exact
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
