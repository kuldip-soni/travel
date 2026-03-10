import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Location from '../admin/container/Location/Location';
import { ThemeProvider } from '@emotion/react';
import theme from '../admin/theme';
import Package from '../admin/container/Package/Package';

function AdminRoutes(props) {
    return (
    <ThemeProvider theme={theme}>
     <Layout>
        <Routes>
            <Route path='/location' element={<Location />}/>
            <Route path='/package'  element={<Package />}/>
        </Routes>
     </Layout>
    </ThemeProvider>
    );
}

export default AdminRoutes;