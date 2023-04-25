import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import News from './pages/News';
import MakeNews from './pages/MakeNews';
import NewsList from './pages/NewsList';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/news-list' element={<NewsList />} />
        <Route path='/news/:id' element={<News />} />
        <Route path='/make-news' element={<MakeNews />} />
      </Routes>
    </div>
  );
}

export default App;