import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cartscreen from './screens/Cartscreen';
import Homescreen from './screens/Homescreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Homescreen />} exact />
          <Route path='/cart' element={<Cartscreen />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
