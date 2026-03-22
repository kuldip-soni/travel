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
import { addservice, getservice, putservice } from '../../../redux/slice/service.slice';
import { getvendor } from '../../../redux/slice/vendor.slice';

const vendor_id = [
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


function Service(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const servicedata = useSelector(state => state.service);
  const vendor = useSelector(state => state.vendor);

  console.log(servicedata);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getservice());
    dispatch(getvendor());

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

  let Serviceschema = object({
    vendor_id: string().required('please select vendor_id'),
    name: string().required('please enter name'),
    description: string().required('please enter description'),
    amount: string().required('please enter amount'),




  });
  const formik = useFormik({
    initialValues: {
      vendor_id: '',
      name: '',
      description: '',
      amount: '',
      service_img: ''




    },
    validationSchema: Serviceschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(putservice(values));

      } else {

        dispatch(addservice(values));
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

    { field: 'vendor_id', headerName: 'vendor_id', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'amount', headerName: 'amount', width: 130 },
    { field: 'service_img', headerName: 'service_img', width: 130 },

    {
      field: 'service_img',
      headerName: 'service_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.service_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delservice(parms.row.id))}>
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
                error={formik.errors.vendor_id && formik.touched.vendor_id}
                id="standard-select-currency-native"
                name="vendor_id"
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
                value={formik.values.vendor_id}
                helperText={formik.errors.vendor_id && formik.touched.vendor_id ? formik.errors.vendor_id : ''}
              >
                 <option>---vendor---</option>
                {vendor.vendor.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.type}
                  </option>
                ))}
              </TextField>

              <TextField

                error={formik.errors.name && formik.touched.name}
                margin="dense"
                id="description"
                name="description"
                label="description"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
              />

              <TextField

                error={formik.errors.amount && formik.touched.amount}
                margin="dense"
                id="amount"
                name="amount"
                label="amount"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                helperText={formik.errors.amount && formik.touched.amount ? formik.errors.amount : ''}

              />

              <TextField

                error={formik.errors.amount && formik.touched.amount}
                margin="dense"
                id="service_img"
                name="service_img"
                label="service_img"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.service_img}
                helperText={formik.errors.service_img && formik.touched.service_img ? formik.errors.service_img : ''}
              />
              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog service_img
                <VisuallyHiddenInput
                  error={formik.errors.service_img && formik.touched.service_img}
                  type="file"
                  name='service_img'

                  onChange={(event) => formik.setFieldValue("service_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.service_img == 'string' ?
                "http://localhost:4000/" + formik.values.service_img :
                URL.createObjectURL(formik.values.service_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.service_img && formik.touched.service_img ?
                <span classname='error'>{formik.errors.service_img}</span> :
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
        rows={servicedata.service}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

    </div>
  );
}

export default Service;