import React, { useState } from 'react';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Home from './container/Home/Home';
import { Route, Routes } from 'react-router-dom';
import About from './container/About/About';
import Destination from './container/Destination/Destination';
import Button from '@mui/material/Button';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>React Counter</h1>

      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>
       <Button variant="contained" color="success">
            Success
        </Button>
      
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/Admin/*' element={<AdminRoutes/>} />
      </Routes>
      
    </div>
  );
}

export default App;
        

