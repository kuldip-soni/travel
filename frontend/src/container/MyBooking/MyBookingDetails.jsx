import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { gethotel } from '../../redux/slice/hotel.slice';
import { getrestaurant } from '../../redux/slice/restaurant.slice';
import { gettransport } from '../../redux/slice/transport.slice';
import { getvendor } from '../../redux/slice/vendor.slice';
import { getservice } from '../../redux/slice/service.slice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function MyBookingDetails(props) {
    const location = useLocation();
    const { id } = location.state;

    console.log(id);

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


    return (
        <section
            id="Popular-Packages"
            style={{
                padding: "40px 20px",
                background: "#f5f7fa",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontSize: "28px",
                        fontWeight: "600",
                    }}
                >
                    Booking Details
                </h2>

                <h3 style={{ marginTop: '50px', fontSize: '24px' }}>Transport Details</h3>
                <TableContainer component={Paper} style={{ fontSize: '30px' }}>
                    <Table sx={{ "& .MuiTableCell-root": { fontSize: "1.5rem" } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>vendor</TableCell>
                                <TableCell>service</TableCell>
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
                                        <TableCell>{vendor.vendor?.find(v2 => v2.id == v?.vendor_id)?.name}</TableCell>
                                        <TableCell>{service?.service?.find(v2 => v2.id == v?.service_id)?.name}</TableCell>
                                        <TableCell>{v?.from}</TableCell>
                                        <TableCell>{v?.to}</TableCell>
                                        <TableCell>{v?.datetime}</TableCell>
                                        <TableCell>{v?.passenger}</TableCell>
                                        <TableCell>{v?.amount}</TableCell>
                                        <TableCell>
                                            <img src={`http://localhost:4000/${v?.transport_img}`} width={'50px'} height={'50px'} />
                                            <a href={`http://localhost:4000/${v?.transport_img}`} download="myFile"><RemoveRedEyeIcon /></a>                                            </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3 style={{ marginTop: '50px', fontSize: '24px' }}>hotel Details</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ "& .MuiTableCell-root": { fontSize: "1.5rem" } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>vendor</TableCell>
                                <TableCell>service</TableCell>
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
                                        <TableCell>
                                            <img src={`http://localhost:4000/${v1?.hotel_img}`} width={'50px'} height={'50px'} />
                                            <a href={`http://localhost:4000/${v1?.hotel_img}`} download="myFile"><RemoveRedEyeIcon /></a>

                                        </TableCell>


                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3 style={{ marginTop: '50px', fontSize: '24px' }}>restaurant Details</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ "& .MuiTableCell-root": { fontSize: "1.5rem" } }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>vendor</TableCell>
                                <TableCell>service</TableCell>
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
                                        <TableCell>{vendor.vendor?.find(v3 => v3.id == v2?.vendor_id)?.name}</TableCell>
                                        <TableCell>{service?.service?.find(v3 => v3.id == v2?.service_id)?.name}</TableCell>
                                        <TableCell>{v2?.datetime}</TableCell>
                                        <TableCell>{v2?.meals}</TableCell>
                                        <TableCell>{v2?.passenger}</TableCell>
                                        <TableCell>{v2?.amount}</TableCell>
                                        <TableCell>
                                            <img src={`http://localhost:4000/${v2?.restaurant_img}`} width={'50px'} height={'50px'} />
                                            <a href={`http://localhost:4000/${v2?.restaurant_img}`} download="myFile"><RemoveRedEyeIcon /></a>
                                            </TableCell>



                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
}

export default MyBookingDetails;