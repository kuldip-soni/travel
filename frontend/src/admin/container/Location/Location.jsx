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



    const locationdata = useSelector(state => state.location);
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
        city: string().required('please enter city'),
        state: string().required('please enter state'),
        country: string().required('please enter country'),

    });


    const formik = useFormik({
        initialValues: {

            city: '',
            state: '',
            country: '',
            image: '',
            
            
        },
        validationSchema: locationschema,


        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if(update){
                console.log("update data");
                dispatch(putlocation(values));

            }else{

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

        { field: 'city', headerName: 'City', width: 130 },
        { field: 'state', headerName: 'State', width: 130 },
        { field: 'country', headerName: 'Country', width: 130 },
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
                                error={formik.errors.city && formik.touched.city}


                                margin="dense"
                                id="city"
                                name="city"
                                label="city"
                                type="text"
                                fullWidth
                                variant="standard"

                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                helperText={formik.errors.city && formik.touched.city ? formik.errors.city : ''}

                            />

                            <TextField

                                error={formik.errors.state && formik.touched.state}
                                margin="dense"
                                id="state"
                                name="state"
                                label="state"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.state}
                                helperText={formik.errors.state && formik.touched.state ? formik.errors.state : ''}
                            />

                            <TextField

                                error={formik.errors.country && formik.touched.country}
                                margin="dense"
                                id="country"
                                name="country"
                                label="country"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.country}
                                helperText={formik.errors.country && formik.touched.country ? formik.errors.country : ''}
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
                                   onChange={(event)=>formik.setFieldValue("image",event.target.files[0])}
                                    onBlur={formik.handleBlur}
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