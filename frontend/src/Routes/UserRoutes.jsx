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
import BookPackage from '../container/BookPackage/BookPackage';
import Contact from '../container/Contact/contact';
import MyBooking from '../container/MyBooking/MyBooking';
import MyBookingDetails from '../container/MyBooking/MyBookingDetails';
import CustomizedPackage from '../container/customizedpackage/customizedpackage';


function UserRoutes(props) {
    return (
        <div>
            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/location' element={<Location />} />
                <Route path='/locationdetails/:id' element={<LocationDetails />} />
                <Route path='/package' element={<Package />} />
                <Route path='/packagedetails/:id' element={<PackageDetails />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/bookpackage' element={<BookPackage />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/myBooking' element={<MyBooking />} />
                <Route path='/myBookingDetails' element={<MyBookingDetails />} />
                <Route path='/customizedpackage' element={<CustomizedPackage />} />



            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoutes;

