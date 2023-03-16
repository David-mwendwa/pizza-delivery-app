import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cartscreen from './screens/Cartscreen';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import Orderscreen from './screens/Orderscreen';
import Registerscreen from './screens/Registerscreen';
import SingleOrderscreen from './screens/SingleOrderscreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homescreen />} exact />
          <Route path='/cart' element={<Cartscreen />} exact />
          <Route path='/register' element={<Registerscreen />} exact />
          <Route path='/login' element={<Loginscreen />} exact />
          <Route path='/orders' element={<Orderscreen />} exact />
          <Route path='/orders/:id' element={<SingleOrderscreen />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
