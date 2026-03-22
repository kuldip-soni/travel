import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { getlocation } from '../../../redux/slice/location.slice';
import { getitineary } from '../../../redux/slice/itineary.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addPackage, delpackage, getpackage, putpackage } from '../../../redux/slice/package.slice';






const location = [
    {
        value: '',
        label: '--select location--',
    },
    {
        value: 'ind',
        label: 'india',
    },
    {
        value: 'jpn',
        label: 'japan',
    },
    {
        value: 'usa',
        label: 'usa',
    },
];

const itineary_id = [
    {
        value: '',
        label: '--select itineary_id--',
    },
    {
        value: 'ind',
        label: 'india',
    },
    {
        value: 'jpn',
        label: 'japan',
    },
    {
        value: 'usa',
        label: 'usa',

    },
];

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



function Package(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);

    const packagedata = useSelector(state => state.package);
    const location = useSelector(state => state.location);
    const itineary = useSelector(state => state.itineary);
    console.log(packagedata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getpackage());
        dispatch(getlocation());
        dispatch(getitineary());

    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setupdate(false);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    let packageschema = object({
        location_id: string().required('please select location'),
        name: string().required('please enter name'),
        duration: string().required('please enter duration'),
        price: string().required('please enter price'),
        itineary_id: string().required('please select itineary_id'),
        image: mixed().required('please upload package image'),



    });




    const formik = useFormik({
        initialValues: {
            location_id: '',
            name: '',
            duration: '',
            price: '',
            itineary_id: '',
            image: '',


        },
        validationSchema: packageschema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                console.log("update data");
                dispatch(putpackage(values));
            } else {
                dispatch(addPackage(values));

            }
            resetForm();
            handleClose()
        },
    });

    const handleEdit = (data) => {
        console.log(data);
        handleClickOpen();
        formik.setValues(data);
        setupdate(true);

    }

    const columns = [

        { field: 'name', headerName: 'name', width: 130 },
        { field: 'duration', headerName: 'duration', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        {
            field: 'image',
            headerName: 'image',
            width: 130,
            renderCell: (params) => (
                <img src={"http://localhost:4000/" + params.row.image} width={'50px'} height={'50px'} />
            )
        },
        {
            headerName: 'Action', width: 130,
            renderCell: (parms) => (
                <>
                    <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => dispatch(delpackage(parms.row.id))}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    console.log(formik.errors);




    const paginationModel = { page: 0, pageSize: 5 };


    console.log(formik.errors, formik.touched);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Package</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add package
                </Button>
            </Box>
            <React.Fragment>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Package</DialogTitle>
                    <DialogContent>

                        <form onSubmit={formik.handleSubmit} id="subscription-form">
                            <TextField
                                error={formik.errors.location_id && formik.touched.location_id}
                                id="standard-select-currency-native"
                                name="location_id"
                                select
                                fullWidth

                                slotProps={{
                                    select: {
                                        native: true,
                                    },
                                }}
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.location_id}
                                helperText={formik.errors.location_id && formik.touched.location_id ? formik.errors.location_id : ''}
                            >
                                <option value="">--Select location--</option>
                                {location.location.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.city}
                                    </option>
                                ))}
                            </TextField>

                            <TextField
                                error={formik.errors.name && formik.touched.name}
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                            />

                            <TextField
                                error={formik.errors.duration && formik.touched.duration}
                                margin="dense"
                                id="duration"
                                name="duration"
                                label="Duration"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.duration}
                                helperText={formik.errors.duration && formik.touched.duration ? formik.errors.duration : ''}
                            />

                            <TextField
                                error={formik.errors.price && formik.touched.price}
                                margin="dense"
                                id="price"
                                name="price"
                                label="price"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                helperText={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
                            />
                            <br /><br />

                            <TextField
                                error={formik.errors.itineary_id && formik.touched.itineary_id}
                                id="standard-select-currency-native"
                                name="itineary_id"
                                select
                                fullWidth

                                slotProps={{
                                    select: {
                                        native: true,
                                    },
                                }}
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.itineary_id}
                                helperText={formik.errors.itineary_id && formik.touched.itineary_id ? formik.errors.itineary_id : ''}
                            >
                                <option >---itineary</option>
                                {itineary.itineary.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.title}
                                    </option>
                                ))}
                            </TextField>

                            <br /><br />

                            <Button

                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload  package image
                                <VisuallyHiddenInput
                                    error={formik.errors.image && formik.touched.image}
                                    type="file"
                                    name='image'


                                    // onChange={(event) => console.log(event.target.files)}
                                    onChange={(event) => formik.setFieldValue("image", event.target.files[0])}
                                    onBlur={formik.handleBlur}
                                />

                            </Button>
                            <img src={typeof formik.values.image == 'string' ?
                                "http://localhost:4000/" + formik.values.image :
                                URL.createObjectURL(formik.values.image)}
                                width={'50px'} height={'50px'} />
                            <br />

                            {formik.errors.image && formik.touched.image ?
                                <span className='error'>{formik.errors.image}</span> :
                                ''}

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={packagedata.package}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />

        </div>
    );
}

export default Package;