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
        Price: string().required('please enter Price'),
        iteneary: string().required('please select iteneary'),
        package_img: mixed().required('please upload package image'),



    });




    const formik = useFormik({
        initialValues: {
            Location: '',
            name:'',
            duration:'',
            Price:'',
            iteneary:'',
            package_img: '',


        },
        validationSchema: packageschema,

        onSubmit: values => {
            console.log(values);

        },
    });

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
                               error={formik.errors.Price && formik.touched.Price}
                                margin="dense"
                                id="Price"
                                name="Price"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.Price}
                                helperText={formik.errors.Price && formik.touched.Price ? formik.errors.Price : ''}
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
                                    error={formik.errors.package_img && formik.touched.package_img}
                                    type="file"
                                    name='package_img'

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.package_img}

                                    //onChange={(event) => console.log(event.target.files)}
                                    multiple
                                />

                            </Button>
                            <br />

                            {formik.errors.package_img && formik.touched.package_img ?
                                <span className='error'>{formik.errors.package_img}</span> :
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

export default Package;