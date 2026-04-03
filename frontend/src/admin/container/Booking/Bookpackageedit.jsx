import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { mixed, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getvendor } from '../../../redux/slice/vendor.slice';
import { getservice } from '../../../redux/slice/service.slice';
import { gettransport } from '../../../redux/slice/transport.slice';
import { gethotel } from '../../../redux/slice/hotel.slice';
import { getrestaurant } from '../../../redux/slice/restaurant.slice';
import { addPayment } from '../../../redux/slice/payment.slice';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Bookpackageedit(props) {
  const { state } = useLocation();

  const { id } = state;

  console.log(id);


  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const transportdata = useSelector(state => state.transport);
  const hoteldata = useSelector(state => state.hotel);
  const restaurantdata = useSelector(state => state.restaurant);


  const vendor = useSelector(state => state.vendor);
  const service = useSelector(state => state.service);
  console.log(service);

  const dispatch = useDispatch();

  const fTransport = transportdata.transport?.filter(v => v.booking_id == id);

  console.log(fTransport);

  const fhotel = hoteldata.hotel?.filter(v => v.booking_id == id);
  console.log(fhotel);

  const frestaurant = restaurantdata.restaurant?.filter(v => v.booking_id == id);
  console.log(frestaurant);



  useEffect(() => {
    dispatch(gethotel());
    dispatch(getrestaurant());

    dispatch(gettransport());
    dispatch(getvendor());
    dispatch(getservice());

  }, []);















  // Mode (Online/Cash),Date, Amount 
  return (
    <div>
      <h2>user Booking Details</h2>

      <h3 style={{ marginTop: '50px' }}>Transport Details</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>from</TableCell>
              <TableCell>to</TableCell>
              <TableCell>datetime</TableCell>
              <TableCell>passenger</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>transport_img</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              fTransport?.map((v) => (
                <TableRow
                  key={v.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{v?.from}</TableCell>
                  <TableCell>{v?.to}</TableCell>
                  <TableCell>{v?.datetime}</TableCell>
                  <TableCell>{v?.passenger}</TableCell>
                  <TableCell>{v?.amount}</TableCell>
                  <TableCell>{v?.transport_img}</TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ marginTop: '50px' }}>hotel Details</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>vendor_id</TableCell>
              <TableCell>service_id</TableCell>
              <TableCell>checkin</TableCell>
              <TableCell>checkout</TableCell>
              <TableCell>datetime</TableCell>
              <TableCell>passenger</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>hotel_img</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fhotel?.map((v1) => (
                <TableRow
                  key={v1.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{vendor.vendor?.find(v2 => v2.id == v1?.vendor_id)?.name}</TableCell>
                  <TableCell>{service?.service?.find(v2 => v2.id == v1?.service_id)?.name}</TableCell>
                  <TableCell>{v1?.checkin}</TableCell>
                  <TableCell>{v1?.checkout}</TableCell>
                  <TableCell>{v1?.datetime}</TableCell>
                  <TableCell>{v1?.passenger}</TableCell>
                  <TableCell>{v1?.amount}</TableCell>
                  <TableCell><img src={`http://localhost:4000/${v1?.hotel_img}`} width={'50px'} height={'50px'} /></TableCell>
                  

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ marginTop: '50px' }}>restaurant Details</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>vendor_id</TableCell>
              <TableCell>service_id</TableCell>
              <TableCell>datetime</TableCell>
              <TableCell>meals</TableCell>
              <TableCell>passenger</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>restaurant_img</TableCell>
             
           
            </TableRow>
          </TableHead>
          <TableBody>
            {
              frestaurant?.map((v2) => (
                <TableRow
                  key={v2.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{v2?.vendor_id}</TableCell>
                  <TableCell>{v2?.service_id}</TableCell>
                  <TableCell>{v2?.datetime}</TableCell>
                  <TableCell>{v2?.meals}</TableCell>
                  <TableCell>{v2?.passenger}</TableCell>
                  <TableCell>{v2?.amount}</TableCell>
                  <TableCell>{v2?.restaurant_img}</TableCell>
                
                  

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default Bookpackageedit;





















