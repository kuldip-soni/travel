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
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addvendor, delvendor, getvendor, putvendor } from '../../../redux/slice/vendor.slice';
import { getlocation } from '../../../redux/slice/location.slice';


const type = [
  {
    value: 'transport',
    label: 'transport',
  },
  {
    value: 'hotel',
    label: 'hotel',
  },
  {
    value: 'restaurent',
    label: 'restaurent',
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

function Vendor(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const vendordata = useSelector(state => state.vendor);
  const location = useSelector(state => state.location);

  console.log(vendordata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getlocation());

    dispatch(getvendor());

  }, []);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setupdate(false)

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
    location_id: string().required('please select location'),

    name: string().required('please enter name'),
    phoneno: string().required('please enter phoneno'),
    gstno: string().required('please enter gstno'),
    email: string().required('please enter email'),
    type: string().required('please select type'),
    company_name: string().required('please enter company_name'),
    status: string().required('please enter status'),
    vendor_img: mixed().required('pleaser upload image'),





  });



  const formik = useFormik({
    initialValues: {
      location_id: '',
      name: '',
      phoneno: '',
      gstno: '',
      email: '',
      type: '',
      company_name: '',
      status: '',
      vendor_img: '',



    },


    validationSchema: Vendorschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(putvendor(values));

      } else {

        dispatch(addvendor(values));
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

    {
      field: 'location_id',
      headerName: 'location_id',
      width: 130,
      renderCell: (params) => {
        const d = location.location?.find(v => v.id == params.row.location_id)?.name
        console.log(location.location, params.row.id, d);

        return d
      }

    },

    { field: 'name', headername: 'name', width: 130 },
    { field: 'phoneno', headername: 'phoneno', width: 130 },
    { field: 'gstno', headername: 'gstno', width: 130 },
    { field: 'email', headername: 'email', width: 130 },
    { field: 'type', headername: 'type', width: 130 },
    { field: 'company_name', headername: 'company_name', width: 130 },
    { field: 'status', headername: 'status', width: 130 },



    {
      field: 'vendor_img',
      headername: 'vendor_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.vendor_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headername: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delvendor(parms.row.id))}>
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
                error={formik.errors.location_id && formik.touched.location_id}
                id="standard-select-currency-native"
                name="location_id"
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
                value={formik.values.location_id}
                helperText={formik.errors.location_id && formik.touched.location_id ? formik.errors.location_id : ''}
              >
                <option value="">--Select location--</option>
                {location.location.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </TextField>


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

                error={formik.errors.phoneno && formik.touched.phoneno}
                margin="dense"
                id="phoneno"
                name="phoneno"
                label="Phone no"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneno}
                helperText={formik.errors.phoneno && formik.touched.phoneno ? formik.errors.phoneno : ''}

              />

              <TextField

                error={formik.errors.gstno && formik.touched.gstno}
                margin="dense"
                id="gstno"
                name="gstno"
                label="GST no"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gstno}
                helperText={formik.errors.gstno && formik.touched.gstno ? formik.errors.gstno : ''}
              />

              <TextField

                error={formik.errors.email && formik.touched.email}
                margin="dense"
                id="email"
                name="email"
                label="email"
                type="email"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
              />
              <br /><br />

              <TextField
                error={formik.errors.type && formik.touched.type}

                id="standard-select-currency-native"
                name='type'
                select
                fullWidth


                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}

                variant="standard"
                helperText={formik.errors.type && formik.touched.type ? formik.errors.type : ''}

              >
                <option>---select type---</option>
                {type.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField

                error={formik.errors.company_name && formik.touched.company_name}
                margin="dense"
                id="company_name"
                name="company_name"
                label="company_name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company_name}
                helperText={formik.errors.company_name && formik.touched.company_name ? formik.errors.company_name : ''}
              />

              <TextField

                error={formik.errors.status && formik.touched.status}
                margin="dense"
                id="status"
                name="status"
                label="status"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                helperText={formik.errors.status && formik.touched.status ? formik.errors.status : ''}
              />
              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog vendor_img
                <VisuallyHiddenInput
                  error={formik.errors.vendor_img && formik.touched.vendor_img}
                  type="file"
                  name='vendor_img'

                  onChange={(event) => formik.setFieldValue("vendor_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.vendor_img == 'string' ?
                "http://localhost:4000/" + formik.values.vendor_img :
                URL.createObjectURL(formik.values.vendor_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.vendor_img && formik.touched.vendor_img ?
                <span classname='error'>{formik.errors.vendor_img}</span> :
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
        rows={vendordata.vendor}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

    </div>
  );
}

export default Vendor;