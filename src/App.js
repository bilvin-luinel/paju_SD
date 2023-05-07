import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import News from './pages/News';
import MakeNews from './pages/MakeNews';
import NewsList from './pages/NewsList';
import TopBar from './component/TopBar';
import UnderBar from './component/UnderBar';
import Map from './pages/Map';

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/news-list' element={<NewsList />} />
        <Route path='/news/:id' element={<News />} />
        <Route path='/make-news' element={<MakeNews />} />
        <Route path='/map' element={<Map />} />
      </Routes>
      <UnderBar />
    </div>
  );
}

export default App;