import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Location from '../admin/container/Location/Location';
import { ThemeProvider } from '@emotion/react';
import theme from '../admin/theme';
import Package from '../admin/container/Package/Package';
import Itineary from '../admin/container/itineary/Itineary';
import Transport from '../admin/container/Transport/Transport';
import Hotel from '../admin/container/Hotel/Hotel';
import Restaurant from '../admin/container/Restaurant/Restaurant';
import Vendor from '../admin/container/Vendor/Vendor';
import Service from '../admin/container/Service/Service';
import Room from '../admin/container/Room/Room';
import Blog from '../admin/container/Blog/Blog';
import Bookpackage from '../admin/container/Booking/Bookpackage';
import Bookpackageedit from '../admin/container/Booking/Bookpackageedit';
import Payment from '../admin/container/Payment/Payment';
import Contact from '../admin/container/Contect/Contect';








function AdminRoutes(props) {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path='/location' element={<Location />} />
                    <Route path='/package' element={<Package />} />
                    <Route path='/itineary' element={<Itineary />} />
                    <Route path='/transport' element={<Transport />} />
                    <Route path='/hotel' element={<Hotel />} />
                    <Route path='/restaurant' element={<Restaurant />} />
                    <Route path='/vendor' element={<Vendor />} />
                    <Route path='/service' element={<Service />} />
                    <Route path='/room' element={<Room />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/booking' element={<Bookpackage />} />
                    <Route path='/bookingedit' element={<Bookpackageedit />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/contact' element={<Contact />} />






                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

export default AdminRoutes;