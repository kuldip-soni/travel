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
    label: '--select Vendor--',
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

function Service(props) {
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

  let Serviceschema = object({
    vendor: string().required('please select vendor'),
    Name: string().required('please enter Name'),
    Description: string().required('please enter Description'),
    Amount: string().required('please enter Amount'),




  });
  const formik = useFormik({
    initialValues: {
      vendor: '',
      Name: '',
      Description: '',
      Amount: '',




    },
    validationSchema: Serviceschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Service</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Service
        </Button>
      </Box>

      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Service</DialogTitle>
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

                error={formik.errors.Name && formik.touched.Name}
                margin="dense"
                id="Name"
                name="Name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
                helperText={formik.errors.Name && formik.touched.Name ? formik.errors.Name : ''}
              />

              <TextField

                error={formik.errors.Description && formik.touched.Description}
                margin="dense"
                id="Description"
                name="Description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Description}
                helperText={formik.errors.Description && formik.touched.Description ? formik.errors.Description : ''}

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

export default Service;