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
  console.log(transportdata);

  const dispatch = useDispatch();

  const fTransport = transportdata.transport?.filter(v => v.booking_id == id);

  console.log(fTransport);

  const fhotel = hoteldata.hotel?.filter(v => v.booking_id == id);
  console.log(fhotel);
  
  

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
      <h2>Customer Booking Details</h2>

      <h3 style={{ marginTop: '50px' }}>Transport Details</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
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
                  <TableCell>{v?.to}</TableCell>
                  <TableCell>{v?.to}</TableCell>
                  <TableCell>{v?.to}</TableCell>
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





















