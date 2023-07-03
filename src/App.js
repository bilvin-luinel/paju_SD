import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import News from './pages/News';
import MakeNews from './pages/MakeNews';
import NewsList from './pages/NewsList';
import Map from './pages/Map';
import LoginPage_map from './pages/LoginPage_map';
import AdminPage from './pages/AdminPage';
import PrivateRoutes from './routes/PrivateRoutes';
import Manager from './pages/Manager';

function App() {



  return (
    <div>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/login_m' element={<LoginPage_map />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/news-list' element={<NewsList />} />
        <Route path='/news/:id' element={<News />} />
        <Route path='/make-news' element={<MakeNews />} />
        <Route path='/map' element={<Map />} />
        <Route path='/admin-page' element={<AdminPage />} />

        <Route
          path='/manager'
          element={<PrivateRoutes path="/manager" element={<Manager />} />}
        />

      </Routes>



    </div>
  );
}


export default App;