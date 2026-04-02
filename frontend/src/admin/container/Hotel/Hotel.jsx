import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getvendor } from '../../../redux/slice/vendor.slice';
import { getservice } from '../../../redux/slice/service.slice';
import { addhotel, delhotel, gethotel, puthotel } from '../../../redux/slice/hotel.slice';



const vendor_id = [
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

const service_id = [
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

function Hotel(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const hoteldata = useSelector(state => state.hotel);
  const vendor = useSelector(state => state.vendor);
  const service = useSelector(state => state.service);
  const bookingdata = useSelector(state => state.bookpackage);

  console.log(hoteldata);
  console.log(bookingdata);

  const hData = bookingdata?.booking?.filter(v => v.status === 'payment_complete');
  console.log(hData);



  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(gethotel());
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

  let Hotelschema = object({
    vendor_id: string().required('please select vendor_id'),
    service_id: string().required('please select service_id'),
    checkin: string().required('please enter checkin'),
    checkout: string().required('please enter checkout'),
    datetime: string().required('please select datetime'),
    passenger: string().required('please enter passenger'),
    amount: string().required('please enter amount'),
    hotel_img: mixed().required('please upload hotel image'),




  });
  const formik = useFormik({
    initialValues: {
      vendor_id: '',
      service_id: '',
      checkin: '',
      checkout: '',
      datetime: '',
      passenger: '',
      amount: '',
      hotel_img: '',


    },


    validationSchema: Hotelschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(puthotel(values));
      } else {
        dispatch(addhotel(values));

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

    {
      field: 'vendor_id',
      headerName: 'vendor_id',
      width: 130,
      renderCell: (params) => {
        const d = vendor.vendor?.find(v => v.id == params.row.vendor_id)?.name
        console.log(vendor.vendor, params.row.id, d);

        return d
      }
    },
    {
      field: 'service_id',
      headerName: 'service_id',
      width: 130,
      renderCell: (params) => {
        const d = service.service?.find(v => v.id == params.row.service_id)?.name
        console.log(service.service, params.row.id, d);

        return d
      }
    },
    { field: 'checkin', headerName: 'checkin', width: 130 },
    { field: 'checkout', headerName: 'checkout', width: 130 },
    { field: 'datetime', headerName: 'datetime', width: 130 },
    { field: 'passenger', headerName: 'passenger', width: 130 },
    { field: 'amount', headerName: 'amount', width: 130 },

    {
      field: 'hotel_img',
      headerName: 'hotel_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.hotel_img} width={'50px'} height={'50px'} />
      )
    },




    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delhotel(parms.row.id))}>
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
                error={formik.errors.checkin && formik.touched.checkin}
                margin="dense"
                id="checkin"
                name="checkin"
                label="checkin"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.checkin}
                helperText={formik.errors.checkin && formik.touched.checkin ? formik.errors.checkin : ''}

              />

              <TextField
                error={formik.errors.checkout && formik.touched.checkout}
                margin="dense"
                id="checkout"
                name="checkout"
                label="checkout"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.checkout}
                helperText={formik.errors.checkout && formik.touched.checkout ? formik.errors.checkout : ''}

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
                helperText={formik.errors.datetime && formik.touched.datetime ? formik.errors.datetime : ''}

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
                helperText={formik.errors.passenger && formik.touched.passenger ? formik.errors.passenger : ''}
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
                Upload   hotel_img
                <VisuallyHiddenInput
                  error={formik.errors.hotel_img && formik.touched.hotel_img}
                  type="file"
                  name='hotel_img'

                  onChange={(event) => formik.setFieldValue("hotel_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.hotel_img == 'string' ?
                "http://localhost:4000/" + formik.values.hotel_img :
                URL.createObjectURL(formik.values.hotel_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.hotel_img && formik.touched.hotel_img ?
                <span className='error'>{formik.errors.hotel_img}</span> :
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
        rows={hoteldata.hotel}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Hotel;