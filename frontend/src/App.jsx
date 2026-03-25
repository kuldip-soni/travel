import React, { useState } from 'react';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Home from './container/Home/Home';
import { Route, Routes } from 'react-router-dom';
import About from './container/About/About';
import Location from './container/Location/Location';
import Button from '@mui/material/Button';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/Admin/*' element={<AdminRoutes/>} />
      </Routes>
      
    </div>
  );
}

export default App;

        

