import React from 'react';
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
        Location: string().required('please select location'),
        loction_img: mixed().required('please upload location image'),


    });


    const formik = useFormik({
        initialValues: {
            Location: '',
            loction_img:'',

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


                                margin="dense"
                                id="city"
                                name="city"
                                label="city"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <TextField


                                margin="dense"
                                id="state"
                                name="state"
                                label="state"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <TextField


                                margin="dense"
                                id="country"
                                name="country"
                                label="country"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <br /><br />

                            <Button

                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload image
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
                             <span className='error'>{formik.errors.loction_img}</span>  :
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