import React from 'react';
import Header from '../component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../component/Footer/Footer';
import Home from '../container/Home/Home';
import About from '../container/About/About';
import Location from '../container/Location/Location';
import LocationDetails from '../container/LocationDetails/LocationDetails';


function UserRoutes(props) {
    return (
        <div>
            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/location' element={<Location />} />
                 <Route path='/locationdetails/:id' element={<LocationDetails/>} /> 
            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoutes;

