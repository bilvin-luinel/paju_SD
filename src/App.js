import { Route, Routes } from 'react-router-dom';
import './App.css';
import History from './pages/History';
import Home from './pages/Home';
import None from './pages/None';
import No from './pages/No';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import Home4 from './pages/Home4';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/test' element={<Home />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/2' element={<Home2 />} />
        <Route path='/3' element={<Home3 />} />
        <Route path='/4' element={<Home4 />} />
        <Route path='/none' element={<None />} />
      </Routes>
    </div>
  );
}

export default App;