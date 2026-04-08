import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { getvendor } from '../../../redux/slice/vendor.slice';
import { getservice } from '../../../redux/slice/service.slice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addtransport, deltransport, gettransport, puttransport } from '../../../redux/slice/transport.slice';
import { getbookpackage } from '../../../redux/slice/bookpackage.slice';
import { getlocation } from '../../../redux/slice/location.slice';




const vendor = [
  {
    value: '',
    label: '--select vendor_id--',
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
    label: '--select service_id--',
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

function Transport(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const transportdata = useSelector(state => state.transport);
  const vendor = useSelector(state => state.vendor);
  const locationdata = useSelector(state => state.location);
  const service = useSelector(state => state.service);
  const bookingdata = useSelector(state => state.bookpackage);
  console.log(transportdata);
  console.log(bookingdata);
  console.log(locationdata);


  const tData = bookingdata?.booking?.filter(v => v.status === 'payment_complete');

  console.log(tData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbookpackage());
    dispatch(gettransport());
    dispatch(getlocation())
    dispatch(getvendor());
    dispatch(getservice());

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

  let Transportschema = object({
    location_id: string().required('please select location'),
    vendor_id: string().required('please select vendor_id'),
    service_id: string().required('please select service_id'),
    from: string().required('please enter From'),
    to: string().required('please enter To'),
    datetime: string().required('please enter Date & Time'),
    passenger: string().required('please enter Passenger'),
    amount: string().required('please enter Amount'),
    transport_img: mixed().required('please upload transport image'),



  });

  const formik = useFormik({
    initialValues: {
      location_id: '',
      vendor_id: '',
      service_id: '',
      from: '',
      to: '',
      datetime: '',
      passenger: '',
      amount: '',
      transport_img: '',


    },
    validationSchema: Transportschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(puttransport(values));
      } else {
        dispatch(addtransport(values));

      }
      resetForm();
      handleClose()
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
      field: 'booking_id',
      headerName: 'Booking Id',
      width: 130
    },
    { field: 'location_id', 
      headerName: 'location_id',
       width: 130,
       renderCell: (params) => {
        const d = locationdata.location?.find(v => v.id == params.row.location_id)?.name
        console.log(locationdata.location, params.row.id, d);

        return d
      }

       },
    { field: 'from', headerName: 'from', width: 130 },
    { field: 'to', headerName: 'to', width: 130 },
    { field: 'datetime', headerName: 'datetime', width: 130 },
    { field: 'passenger', headerName: 'passenger', width: 130 },
    { field: 'amount', headerName: 'amount', width: 130 },

    {
      field: 'transport_img',
      headerName: 'transport_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.transport_img} width={'50px'} height={'50px'} />
      )
    },




    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(deltransport(parms.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
  ];

  console.log(formik.errors);




  const paginationModel = { page: 0, pageSize: 5 };

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
                error={formik.errors.booking_id && formik.touched.booking_id}
                id="standard-select-currency-native"
                name="booking_id"
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
                value={formik.values.booking_id}
                helperText={formik.errors.booking_id && formik.touched.booking_id ? formik.errors.booking_id : ''}
              >
                <option value="">--Select booking--</option>
                {bookingdata?.booking?.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id}
                  </option>
                ))}
              </TextField>
              <br /><br />

                <TextField
                 error={formik.errors.booking_id && formik.touched.booking_id}
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
                 {locationdata?.location?.map((v) => (
                   <option key={v.id} value={v.id}>
                     {v.name}
                   </option>
                 ))}
               </TextField>
                 <br /><br />

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
                <option value="">--Select vendor--</option>
                {vendor.vendor.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </TextField>
              <br /><br />

              <TextField
                error={formik.errors.service_id && formik.touched.service_id}
                id="standard-select-currency-native"
                name="service_id"
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
                value={formik.values.service_id}
                helperText={formik.errors.service_id && formik.touched.service_id ? formik.errors.service_id : ''}
              >
                <option value="">--Select service--</option>
                {service.service.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </TextField>

              <TextField
                error={formik.errors.from && formik.touched.from}
                margin="dense"
                id="from"
                name="from"
                label="from"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.from}
                helperText={formik.errors.from && formik.touched.from ? formik.errors.From : ''}
              />

              <TextField
                error={formik.errors.to && formik.touched.to}
                margin="dense"
                id="to"
                name="to"
                label="to"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.to}
                helperText={formik.errors.to && formik.touched.to ? formik.errors.To : ''}
              />

              <TextField
                error={formik.errors.datetime && formik.touched.datetime}
                margin="dense"
                id="datetime"
                name="datetime"

                type="datetime-local"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.datetime}
                helperText={formik.errors.datetime && formik.touched.datetime ? formik.errors.DateTime : ''}
              />

              <TextField
                error={formik.errors.passenger && formik.touched.passenger}
                margin="dense"
                id="passenger"
                name="passenger"
                label="passenger"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passenger}
                helperText={formik.errors.passenger && formik.touched.passenger ? formik.errors.Passenger : ''}
              />

              <TextField
                error={formik.errors.amount && formik.touched.amount}
                margin="dense"
                id="amount"
                name="amount"
                label="amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                helperText={formik.errors.amount && formik.touched.amount ? formik.errors.amount : ''}
              />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog transport_img
                <VisuallyHiddenInput
                  error={formik.errors.transport_img && formik.touched.transport_img}
                  type="file"
                  name='transport_img'

                  onChange={(event) => formik.setFieldValue("transport_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.transport_img == 'string' ?
                "http://localhost:4000/" + formik.values.transport_img :
                URL.createObjectURL(formik.values.transport_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.transport_img && formik.touched.transport_img ?
                <span className='error'>{formik.errors.transport_img}</span> :
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
        rows={transportdata.transport}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

    </div>
  );
}

export default Transport;