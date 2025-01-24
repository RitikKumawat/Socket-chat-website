import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const {authUser} = useSelector((state)=>state.auth);
  console.log("AUTH USER",authUser);
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser!==null ? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={authUser!==null ? <Navigate to={"/"}/> :<Login/>}/>
        <Route path='/signup' element={authUser!==null ? <Navigate to={"/"}/> : <Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
