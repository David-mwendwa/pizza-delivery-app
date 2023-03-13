import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cartscreen from './screens/Cartscreen';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Homescreen />} exact />
          <Route path='/cart' element={<Cartscreen />} exact />
          <Route path='/register' element={<Registerscreen />} exact />
          <Route path='/login' element={<Loginscreen />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
