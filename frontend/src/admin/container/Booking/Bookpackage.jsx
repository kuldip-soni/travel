
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { getbookpackage } from '../../../redux/slice/bookpackage.slice';
// import { getbookpackage } from '../../../redux/slice/bookpackage.slice';




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
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);


    const bookingdata = useSelector(state => state.bookpackage);
    const packagedata = useSelector(state => state.package);
    const locationdata = useSelector(state => state.location);
    console.log(bookingdata);
    console.log(locationdata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getbookpackage());


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

        { field: 'location_id',
             headerName: 'location_id', 
             width: 130,
             },
        { field: 'package_id', headerName: 'package_id', width: 130 },
        { field: 'travel_date', headerName: 'travel_date', width: 130 },
        { field: 'passenger', headerName: 'passenger', width: 130 },



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