import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login  from './features/Auth/Login';
import Register from './features/Auth/Register';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/home/*" element={<Home />}/>
      
      </Routes>
    </div>
  );
}

export default App;
