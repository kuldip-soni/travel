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
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { addPackage, delpackage, getpackage } from '../../../redux/slice/package.slice';
import { useDispatch, useSelector } from 'react-redux';




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

const iteneary = [
    {
        value: '',
        label: '--select iteneary--',
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

    const packagedata = useSelector(state => state.package);
    console.log(packagedata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getpackage());

    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        Location: string().required('please select location'),
        name: string().required('please enter name'),
        duration: string().required('please enter duration'),
        price: string().required('please enter price'),
        iteneary: string().required('please select iteneary'),
        image: mixed().required('please upload package image'),



    });




    const formik = useFormik({
        initialValues: {
            Location: '',
            name: '',
            duration: '',
            price: '',
            iteneary: '',
            image: '',


        },
        validationSchema: packageschema,

        onSubmit: (values, {resetForm}) => {
            console.log(values);
           dispatch(addPackage(values))
            resetForm();
            handleClose()
        },
    });

    const columns = [

        { field: 'name', headerName: 'name', width: 130 },
        { field: 'duration', headerName: 'duration', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        { field: 'image', headerName: 'image', width: 130 },
        {
            headerName: 'Action', width: 130,
            renderCell: (parms) => (
                <IconButton aria-label="delete" onClick={() => dispatch(delpackage(parms.row.id))}>
                    <DeleteIcon />
                </IconButton>
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
                                error={formik.errors.Location && formik.touched.Location}
                                id="standard-select-currency-native"
                                name="Location"
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
                                value={formik.values.Location}
                                helperText={formik.errors.Location && formik.touched.Location ? formik.errors.Location : ''}
                            >
                                {location.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
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
                                error={formik.errors.iteneary && formik.touched.iteneary}
                                id="standard-select-currency-native"
                                name="iteneary"
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
                                value={formik.values.iteneary}
                                helperText={formik.errors.iteneary && formik.touched.iteneary ? formik.errors.iteneary : ''}
                            >
                                {iteneary.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
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

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.image}

                                    //onChange={(event) => console.log(event.target.files)}
                                    multiple
                                />

                            </Button>
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