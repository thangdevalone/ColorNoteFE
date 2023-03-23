import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './features/Auth/Login';
import Register from './features/Auth/Register';
import { checkJWT } from './constants';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={checkJWT() ? <Navigate to='/login' replace /> : <Navigate to='/home' replace />} />
        <Route path='/login' element={checkJWT() ? <Login /> : <Navigate to='/home' replace />} />
        <Route path='/register' element={checkJWT() ? <Register /> : <Navigate to='/home' replace />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
