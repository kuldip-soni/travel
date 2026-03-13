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

const vendor = [
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

const service = [
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

function Restaurant(props) {
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

  let Restaurantschema = object({
    vendor: string().required('please select vendor'),
    service: string().required('please select service'),


  });
  const formik = useFormik({
    initialValues: {
      vendor: '',
      service: '',



    },
    validationSchema: Restaurantschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Restaurant</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Restaurant
        </Button>
      </Box>
      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Restaurant</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">

              <TextField
                error={formik.errors.vendor && formik.touched.vendor}
                id="standard-select-currency-native"
                name="vendor"
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
                value={formik.values.vendor}
                helperText={formik.errors.vendor && formik.touched.vendor ? formik.errors.vendor : ''}
              >
                {vendor.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                error={formik.errors.service && formik.touched.service}
                id="standard-select-currency-native"
                name="service"
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
                value={formik.values.service}
                helperText={formik.errors.service && formik.touched.service ? formik.errors.service : ''}
              >
                {service.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                
                margin="dense"
                id="Date & Time"
                name="Date & Time"
                label="Date & Time"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
                
                margin="dense"
                id="No of meals"
                name="No of meals"
                label="No of meals"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
                
                margin="dense"
                id="Passenger"
                name="Passenger"
                label="Passenger"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
               
                margin="dense"
                id="Amount"
                name="Amount"
                label="Amount"
                type="text"
                fullWidth
                variant="standard"
              />


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

export default Restaurant;