
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { getbookpackage } from '../../../redux/slice/bookpackage.slice';
import { getlocation } from '../../../redux/slice/location.slice';
import { getpackage } from '../../../redux/slice/package.slice';
import { useNavigate } from 'react-router-dom';
import { addPayment, getPayment, putPayment } from '../../../redux/slice/payment.slice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

const mode = [
    {
        value: 'online',
        label: 'online',
    },
    {
        value: 'cash',
        label: 'cash',
    },

];

const status = [
    {
        value: 'pending',
        label: 'pending',
    },
    {
        value: 'complete',
        label: 'complete',
    },

];


function Payment(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);
    const [paymentId, setPaymentId] = useState();
    const [bookigData, setBookingData] = useState();


    const bookingdata = useSelector(state => state.bookpackage);
    const packagedata = useSelector(state => state.package);
    const locationdata = useSelector(state => state.location);
    const paymentdata = useSelector(state => state.payment);

    console.log(bookingdata);
    console.log("paymentdata.payment", paymentdata.payment);


    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setupdate(false);
    };

    useEffect(() => {

        dispatch(getbookpackage());
        dispatch(getlocation());
        dispatch(getpackage());

        dispatch(getPayment())


    }, []);




    const handleEdit = (data) => {
        console.log(data);
        setBookingData(data)
        handleClickOpen();

        // const uData = paymentdata.payment?.find(v => bookingdata.booking.some(v1 => v1.id == v.booking_id));

        const uData = paymentdata.payment?.find(v => v.booking_id == data.id);

        console.log(uData);

        if (uData) {
            paymentFormik.setValues({ user_id: uData.user_id, booking_id: uData.id, transaction_id: uData.transaction_id, mode: uData.mode, date: uData.date, amount: uData.amount, status: uData.status });

            setupdate(true)
            setPaymentId(uData.id);
        } else {

            // paymentFormik.setValues({...data, id: data.id})
        }





    }

    const columns = [

        {
            field: 'location_id',
            headerName: 'location_id',
            width: 130,
            renderCell: (params) => {
                const d = locationdata.location?.find(v => v.id == params.row.location_id)?.name
                // console.log(locationdata.location, params.row.id, d);

                return d
            }
        },
        {
            field: 'id',
            headerName: 'Booking id',
            width: 130
        },
        { field: 'travel_date', headerName: 'travel_date', width: 130 },
        { field: 'passenger', headerName: 'passenger', width: 130 },
        { field: 'status', headerName: 'status', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (parms) => (
                <>
                    <IconButton
                        aria-label="Edit"
                        onClick={() => handleEdit(parms.row)}
                    >
                        <EditIcon />
                    </IconButton>

                </>
            ),
        },


    ];



    const paginationModel = { page: 0, pageSize: 5 };


    let Paymentschema = object({
        mode: string().required('please select mode'),
        transaction_id: string().required('please enter transaction_id'),
        date: string().required('please select date'),
        amount: string().required('please enter amount'),
        status: string().required('please enter status'),
    });

    const paymentFormik = useFormik({
        initialValues: {
            mode: '',
            transaction_id: '',
            date: '',
            amount: '',
            status: '',


        },
        validationSchema: Paymentschema,
        onSubmit: (values, { resetForm }) => {
                console.log("sssss", update, values, bookigData);

            if (update) {
                dispatch(putPayment({ ...values, id: paymentId }))
            } else {
                dispatch(addPayment(
                    { user_id: bookigData.user_id, booking_id: bookigData.id, transaction_id: values.transaction_id, mode: values.mode, date: values.date, amount: values.amount, status: values.status }))

            }

            window.location.reload();

            setBookingData();
            setupdate(false);
            setPaymentId();

            resetForm();
            handleClose()
        },
    });


    console.log("paymentFormik.values.status", paymentFormik.values.status);


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Payment</h1>


            </Box>



            <React.Fragment>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Payment</DialogTitle>
                    <DialogContent>

                        <form onSubmit={paymentFormik.handleSubmit} style={{ marginBottom: '50px' }} id="payment-form">

                            <TextField
                                error={paymentFormik.errors.mode && paymentFormik.touched.mode}
                                id="standard-select-currency-native"
                                name="mode"
                                select
                                fullWidth

                                slotProps={{
                                    select: {
                                        native: true,
                                    },
                                }}
                                variant="standard"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.mode}
                                helperText={paymentFormik.errors.mode && paymentFormik.touched.mode ? paymentFormik.errors.mode : ''}
                            >
                                <option value="">--Select mode--</option>
                                {mode.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <br />

                            <TextField
                                error={paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id}
                                id="transaction_id"
                                name="transaction_id"
                                type="text"
                                label="transaction_id "
                                fullWidth
                                variant="standard"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.transaction_id}
                                helperText={paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id ? paymentFormik.errors.transaction_id : ''}
                            ></TextField>

                            <TextField

                                error={paymentFormik.errors.date && paymentFormik.touched.date}
                                margin="dense"
                                id="date"
                                name="date"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.date}
                                helperText={paymentFormik.errors.date && paymentFormik.touched.date ? paymentFormik.errors.date : ''}

                            />

                            <TextField

                                error={paymentFormik.errors.amount && paymentFormik.touched.amount}
                                margin="dense"
                                id="amount"
                                name="amount"
                                label="amount"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.amount}
                                helperText={paymentFormik.errors.amount && paymentFormik.touched.amount ? paymentFormik.errors.amount : ''}
                            />

                            <TextField
                                error={paymentFormik.errors.status && paymentFormik.touched.status}
                                id="standard-select-currency-native"
                                name="status"
                                select
                                fullWidth

                                
                                variant="standard"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.status}
                                helperText={paymentFormik.errors.status && paymentFormik.touched.status ? paymentFormik.errors.status : ''}
                            >
                                <option value="">--Select status--</option>
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>



                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="payment-form">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={bookingdata.booking}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />


        </>
    );
}

export default Payment;