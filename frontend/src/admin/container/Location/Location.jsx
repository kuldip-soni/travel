import React, { useEffect, useState } from 'react';
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
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { addlocation, dellocation, getlocation, putlocation } from '../../../redux/slice/location.slice';






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


function Location(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);



    const locationdata = useSelector(State => State.location);
    console.log(locationdata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getlocation());

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


    let locationschema = object({

        image: mixed().required('please upload location image'),
        name: string().required('please enter name'),
        description: string().required('please enter description'),

    });


    const formik = useFormik({
        initialValues: {

            name: '',
            description: '',
            image: '',


        },
        validationSchema: locationschema,


        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                console.log("update data");
                dispatch(putlocation(values));

            } else {

                dispatch(addlocation(values));
            }


            handleClose();
            resetForm();


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
        { field: 'description', headerName: 'description', width: 130 },
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
                    <IconButton aria-label="delete" onClick={() => dispatch(dellocation(parms.row.id))}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },


    ];


    const paginationModel = { page: 0, pageSize: 5 };

    console.log(formik.errors, formik.touched);

    return (

        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Location</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Location
                </Button>

            </Box>



            <React.Fragment>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Location</DialogTitle>
                    <DialogContent>

                        <form onSubmit={formik.handleSubmit} id="subscription-form">


                            <TextField
                                error={formik.errors.name && formik.touched.name}


                                margin="dense"
                                id="name"
                                name="name"
                                label="name"
                                type="text"
                                fullWidth
                                variant="standard"

                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}

                            />

                            <TextField

                                error={formik.errors.description && formik.touched.description}
                                margin="dense"
                                id="description"
                                name="description"
                                label="description"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
                            />



                            <br /><br />

                            <Button

                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload  location image
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
                rows={locationdata.location}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />

        </div>
    );
}

export default Location;