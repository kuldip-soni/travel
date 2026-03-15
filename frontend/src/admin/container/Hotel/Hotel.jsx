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
    label: '--select vendor--',
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
    label: '--select service--',
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

function Hotel(props) {
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

  let Hotelschema = object({
    vendor: string().required('please select vendor'),
    service: string().required('please select service'),
    Checkin: string().required('please enter Checkin'),
    Checkout: string().required('please enter Checkout'),
    Datetime: string().required('please select Datetime'),
    Passenger: string().required('please enter Passenger'),
    Amount: string().required('please enter Amount'),




  });
  const formik = useFormik({
    initialValues: {
      vendor: '',
      service: '',
      Checkin: '',
      Checkout: '',
      Datetime: '',
      Passenger: '',
      Amount: '',

    },


    validationSchema: Hotelschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Hotel</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Hotel
        </Button>
      </Box>
      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Hotel</DialogTitle>
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
              <br /><br />
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
                error={formik.errors.Checkin && formik.touched.Checkin}
                margin="dense"
                id="Checkin"
                name="Checkin"
                label="Checkin"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Checkin}
                helperText={formik.errors.Checkin && formik.touched.Checkin ? formik.errors.Checkin : ''}

              />

              <TextField
                error={formik.errors.Checkout && formik.touched.Checkout}
                margin="dense"
                id="Checkout"
                name="Checkout"
                label="Checkout"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Checkout}
                helperText={formik.errors.Checkout && formik.touched.Checkout ? formik.errors.Checkout : ''}

              />

              <TextField
                error={formik.errors.Datetime && formik.touched.Datetime}
                margin="dense"
                id="Datetime"
                name="Datetime"
                type="datetime-local"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Datetime}
                helperText={formik.errors.Datetime && formik.touched.Datetime ? formik.errors.Datetime : ''}

              />


              <TextField

                error={formik.errors.Passenger && formik.touched.Passenger}
                margin="dense"
                id="Passenger"
                name="Passenger"
                label="Passenger"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Passenger}
                helperText={formik.errors.Passenger && formik.touched.Passenger ? formik.errors.Passenger : ''}
              />

              <TextField

                error={formik.errors.Amount && formik.touched.Amount}
                margin="dense"
                id="Amount"
                name="Amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Amount}
                helperText={formik.errors.Amount && formik.touched.Amount ? formik.errors.Amount : ''}
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

export default Hotel;