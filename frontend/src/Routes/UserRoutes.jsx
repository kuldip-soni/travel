import React from 'react';
import Header from '../component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../component/Footer/Footer';
import Home from '../container/Home/Home';
import About from '../container/About/About';
import Location from '../container/Location/Location';
import LocationDetails from '../container/LocationDetails/LocationDetails';
import Register from '../admin/container/Register/Register';
import Login from '../admin/container/Login/Login';
import Package from '../container/Package/Package';
import PackageDetails from '../container/PackageDetails/PackageDetails';


function UserRoutes(props) {
    return (
        <div>
            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/location' element={<Location />} />
                <Route path='/locationdetails/:id' element={<LocationDetails />} />
                <Route path='/package' element={<Package/>} />
                <Route path='/packagedetails/:id' element={<PackageDetails />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />



            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoutes;

