import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyModels from '../pages/MyModels';
import Register from '../pages/Register';
import SendFile from '../pages/SendFile';

export default function RoutesComponent() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='mymodels' element={<MyModels />} />
        <Route path='register' element={<Register />} />
        <Route path='sendModel' element={<SendFile />} />

      </Routes>
    </div>
  )
}