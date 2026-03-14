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

function Transport(props) {
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

  let Transportschema = object({
    vendor: string().required('please select vendor'),
    service: string().required('please select service'),
    From: string().required('please enter From'),
    To: string().required('please enter To'),
    DateTime: string().required('please enter Date & Time'),
    Passenger: string().required('please enter Passenger'),
    Amount: string().required('please enter Amount'),



  });

  const formik = useFormik({
    initialValues: {
      vendor: '',
      service: '',
      From:'',
      To:'',
      DateTime:'',
      Passenger:'',
      Amount:'',



    },
    validationSchema: Transportschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);


  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Transport</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Transport
        </Button>
      </Box>

      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Transport</DialogTitle>
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
                error={formik.errors.From && formik.touched.From}
                margin="dense"
                id="From"
                name="From"
                label="From"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.From}
                helperText={formik.errors.From && formik.touched.From ? formik.errors.From : ''}
              />

              <TextField
               error={formik.errors.To && formik.touched.To}
                margin="dense"
                id="To"
                name="To"
                label="To"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.To}
                helperText={formik.errors.To && formik.touched.To ? formik.errors.To : ''}
              />

              <TextField
               error={formik.errors.DateTime && formik.touched.DateTime}
                margin="dense"
                id="DateTime"
                name="DateTime"
                
                type="datetime-local"
                fullWidth
                variant="standard"
                 onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.DateTime}
                helperText={formik.errors.DateTime && formik.touched.DateTime ? formik.errors.DateTime : ''}
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

export default Transport;