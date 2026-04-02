
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
// import { getbookpackage } from '../../../redux/slice/bookpackage.slice';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function Bookpackage(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);


    const bookingdata = useSelector(state => state.bookpackage);
    const packagedata = useSelector(state => state.package);
    const locationdata = useSelector(state => state.location);
    console.log(bookingdata);
    console.log(locationdata);
    console.log(packagedata);


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getbookpackage());
        dispatch(getlocation());
        dispatch(getpackage());


    }, []);

    let bookpackageschema = object({
        location_id: string().required('please select location'),
        package_id: string().required('please select package'),
        travel_date: string().required('please enter travel_date'),
        passenger: string().required('please enter no passenger'),
    });

    const formik = useFormik({
        initialValues: {

            location_id: '',
            package_id: '',
            travel_date: '',
            passenger: '',



        },
        validationSchema: bookpackageschema,

        onSubmit: (values, { resetForm }) => {


        },
    });

    const handleEdit = (data) => {
        console.log(data);
        handleClickOpen();
        formik.setValues(data);
        setupdate(true);

    }

    const columns = [
        { field: 'id', headerName: 'booking_id', width: 130 },
        {
            field: 'location_id',
            headerName: 'location_id',
            width: 130,
            renderCell: (params) => {
                const d = locationdata.location?.find(v => v.id == params.row.location_id)?.name
                console.log(locationdata.location, params.row.id, d);

                return d
            }
        },
        {
            field: 'package_id',
            headerName: 'package_id',
            width: 130,
            renderCell: (params) => {
                const d = packagedata.package?.find(v => v.id == params.row.package_id)?.name
                console.log(packagedata.package, params.row.id, d);

                return d
            }
        },
        { field: 'travel_date', headerName: 'travel_date', width: 130 },
        { field: 'passenger', headerName: 'passenger', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (parms) => (
                <>
                    <IconButton
                        aria-label="Edit"
                        onClick={() => navigate("/admin/bookingedit", {state: {id: parms.row.id}})}
                    >
                        <RemoveRedEyeIcon />
                    </IconButton>

                </>
            ),
        },


    ];



    const paginationModel = { page: 0, pageSize: 5 };

    console.log(formik.errors, formik.touched, formik.values.location_id);




    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Bookpackage</h1>

            </Box>

            <DataGrid
                rows={bookingdata.booking}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />


        </div>
    );
}

export default Bookpackage;