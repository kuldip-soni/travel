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

function Vendor(props) {
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

  let Vendorschema = object({
    Name: string().required('please enter Name'),
    Phoneno: string().required('please enter Phoneno'),
    GSTno: string().required('please enter GSTno'),
    Email: string().required('please enter Email'),
    Type: string().required('please enter Type'),
    Company_name: string().required('please enter Company_name'),
    Status: string().required('please enter Status'),





  });



  const formik = useFormik({
    initialValues: {
      Name: '',
      Phoneno: '',
      GSTno: '',
      Email: '',
      Type: '',
      Company_name: '',
      Status: '',




    },


    validationSchema: Vendorschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Vendor</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Vendor
        </Button>
      </Box>

      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Vendor</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">


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

                error={formik.errors.Phoneno && formik.touched.Phoneno}
                margin="dense"
                id="Phoneno"
                name="Phoneno"
                label="Phone no"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Phoneno}
                helperText={formik.errors.Phoneno && formik.touched.Phoneno ? formik.errors.Phoneno : ''}

              />

              <TextField

                error={formik.errors.GSTno && formik.touched.GSTno}
                margin="dense"
                id="GSTno"
                name="GSTno"
                label="GST no"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GSTno}
                helperText={formik.errors.GSTno && formik.touched.GSTno ? formik.errors.GSTno : ''}
              />

              <TextField

                error={formik.errors.Email && formik.touched.Email}
                margin="dense"
                id="Email"
                name="Email"
                label="Email"
                type="Email"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                helperText={formik.errors.Email && formik.touched.Email ? formik.errors.Email : ''}
              />

              <TextField

                error={formik.errors.Type && formik.touched.Type}
                margin="dense"
                id="Type"
                name="Type"
                label="Type"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Type}
                helperText={formik.errors.Type && formik.touched.Type ? formik.errors.Type : ''}
              />

              <TextField

                error={formik.errors.Company_name && formik.touched.Company_name}
                margin="dense"
                id="Company_name"
                name="Company_name"
                label="Company_name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Company_name}
                helperText={formik.errors.Company_name && formik.touched.Company_name ? formik.errors.Company_name : ''}
              />

              <TextField

                error={formik.errors.Status && formik.touched.Status}
                margin="dense"
                id="Status"
                name="Status"
                label="Status"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Status}
                helperText={formik.errors.Status && formik.touched.Status ? formik.errors.Status : ''}
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

export default Vendor;