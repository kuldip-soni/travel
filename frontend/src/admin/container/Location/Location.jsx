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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import { getlocation } from '../../../redux/slice/location.slice';






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

    const dispatch = useDispatch();

    useEffect(()=>{
         
        dispatch(getlocation());

    },[]);

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

    let locationschema = object({

        loction_img: mixed().required('please upload location image'),
        city: string().required('please enter city'),
        state: string().required('please enter state'),
        country: string().required('please enter country'),

    });


    const formik = useFormik({
        initialValues: {

            loction_img: '',
            city: '',
            state:'',
            country:'',

        },
        validationSchema: locationschema,

        onSubmit: values => {
            console.log(values);

        },
    });

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
                                    error={formik.errors.loction_img && formik.touched.loction_img}
                                    type="file"
                                    name='loction_img'

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.loction_img}

                                    //onChange={(event) => console.log(event.target.files)}
                                    multiple
                                />
                            </Button>
                            <br />

                            {formik.errors.loction_img && formik.touched.loction_img ?
                                <span className='error'>{formik.errors.loction_img}</span> :
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

        </div>
    );
}

export default Location;