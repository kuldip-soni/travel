import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { mixed, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getvendor } from '../../../redux/slice/vendor.slice';
import { getservice } from '../../../redux/slice/service.slice';
import { gettransport } from '../../../redux/slice/transport.slice';
import { gethotel } from '../../../redux/slice/hotel.slice';
import { getrestaurant } from '../../../redux/slice/restaurant.slice';

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


function Bookpackageedit(props) {

  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const transportdata = useSelector(state => state.transport);
  const hoteldata = useSelector(state => state.hotel);
  const restaurantdata = useSelector(state => state.restaurant);


  const vendor = useSelector(state => state.vendor);
  const service = useSelector(state => state.service);
  console.log(transportdata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gethotel());
    dispatch(getrestaurant());

    dispatch(gettransport());
    dispatch(getvendor());
    dispatch(getservice());

  }, []);

  let Transportschema = object({
    vendor_id: string().required('please select vendor_id'),
    service_id: string().required('please select service_id'),
    from: string().required('please enter from'),
    to: string().required('please enter To'),
    datetime: string().required('please enter Date & Time'),
    passenger: string().required('please enter Passenger'),
    amount: string().required('please enter Amount'),
  });

  let Hotelschema = object({
    vendor_id: string().required('please select vendor_id'),
    service_id: string().required('please select service_id'),
    checkin: string().required('please enter checkin'),
    checkout: string().required('please enter checkout'),
    datetime: string().required('please select datetime'),
    passenger: string().required('please enter passenger'),
    amount: string().required('please enter amount'),
  });
  let Restaurantschema = object({
    vendor_id: string().required('please select vendor_id'),
    service_id: string().required('please select service_id'),
    datetime: string().required('please select datetime'),
    meals: string().required('please enter no of meals'),
    passenger: string().required('please enter passenger'),
    amount: string().required('please enter amount'),


  });




  const formik = useFormik({
    initialValues: {
      vendor_id: '',
      service_id: '',
      from: '',
      to: '',
      datetime: '',
      passenger: '',
      amount: '',
      checkin: '',
      checkout: '',
      datetime: '',
      passenger: '',
      amount: '',
      datetime: '',
      meals: '',
      passenger: '',
      amount: '',




    },
    validationSchema: Transportschema,
    validationSchema: Hotelschema,
    validationSchema: Restaurantschema,




    onSubmit: (values, { resetForm }) => {
      console.log(values);

      resetForm();
      handleClose()
    },
  });



  return (
    <div>
      <div class="row" >
        <div class="col-4">
          <h2>Book Transport</h2>

          <form onSubmit={formik.handleSubmit} id="transport-form">
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
              {vendor?.vendor?.map((v) => (
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
              {service?.service?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.description}
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
              helperText={formik.errors.from && formik.touched.from ? formik.errors.from : ''}
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
              helperText={formik.errors.to && formik.touched.to ? formik.errors.to : ''}
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


          </form>


          <Button type="submit" form="transport-form">
            Submit
          </Button>
        </div>



        <div class="col-4">
          <h2>Book Hotel</h2>


          <form onSubmit={formik.handleSubmit} id="hotel-form">

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


          </form>
          <Button type="submit" form="hotel-form">
            Submit
          </Button>

        </div>

        <div class="col-4">

          <h2>Book Restaurant</h2>


          <form onSubmit={formik.handleSubmit} id="restaurant-form">

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
            <br /><br />

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

              error={formik.errors.meals && formik.touched.meals}
              margin="dense"
              id="meals"
              name="meals"
              label="No of meals"
              type="number"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.meals}
              helperText={formik.errors.meals && formik.touched.meals ? formik.errors.meals : ''}
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
          </form>
          <Button type="submit" form="restaurant-form">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Bookpackageedit;










