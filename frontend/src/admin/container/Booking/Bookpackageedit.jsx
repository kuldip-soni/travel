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
import { addPayment } from '../../../redux/slice/payment.slice';

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






  const transFormik = useFormik({
    initialValues: {
      vendor_id: '',
      service_id: '',
      from: '',
      to: '',
      datetime: '',
      passenger: '',
      amount: '',
    },
    validationSchema: Transportschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      
      resetForm();
      handleClose()
    },
  });

  const hotelFormik = useFormik({
    initialValues: {
      vendor_id: '',
      service_id: '',
      checkin: '',
      checkout: '',
      datetime: '',
      passenger: '',
      amount: '',

    },
    validationSchema: Hotelschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      resetForm();
      handleClose()
    },
  });

  const restaurantFormik = useFormik({
    initialValues: {
      vendor_id: '',
      service_id: '',
      datetime: '',
      meals: '',
      passenger: '',
      amount: '',

    },
    validationSchema: Restaurantschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      resetForm();
      handleClose()
    },
  });






  // Mode (Online/Cash),Date, Amount 
  return (
    <div>
      <h2>Payment</h2>
      <div className="row">
        <div className="col-6">
          
        </div>
      </div>
      <div class="row" >
        <div class="col-4">
          <h2>Book Transport</h2>

          <form onSubmit={transFormik.handleSubmit} style={{ padding: '0 20px' }} id="transport-form">
            <TextField
              error={transFormik.errors.mode && transFormik.touched.vendor_id}
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
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.vendor_id}
              helperText={transFormik.errors.vendor_id && transFormik.touched.vendor_id ? transFormik.errors.vendor_id : ''}
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
              error={transFormik.errors.service_id && transFormik.touched.service_id}
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
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.service_id}
              helperText={transFormik.errors.service_id && transFormik.touched.service_id ? transFormik.errors.service_id : ''}
            >
              <option value="">--Select service--</option>
              {service?.service?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.description}
                </option>
              ))}
            </TextField>

            <TextField
              error={transFormik.errors.from && transFormik.touched.from}
              margin="dense"
              id="from"
              name="from"
              label="from"
              type="text"
              fullWidth
              variant="standard"
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.from}
              helperText={transFormik.errors.from && transFormik.touched.from ? transFormik.errors.from : ''}
            />

            <TextField
              error={transFormik.errors.to && transFormik.touched.to}
              margin="dense"
              id="to"
              name="to"
              label="to"
              type="text"
              fullWidth
              variant="standard"
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.to}
              helperText={transFormik.errors.to && transFormik.touched.to ? transFormik.errors.to : ''}
            />

            <TextField
              error={transFormik.errors.datetime && transFormik.touched.datetime}
              margin="dense"
              id="datetime"
              name="datetime"
              type="date"
              fullWidth
              variant="standard"
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.datetime}
              helperText={transFormik.errors.datetime && transFormik.touched.datetime ? transFormik.errors.datetime : ''}

            />

            <TextField
              error={transFormik.errors.passenger && transFormik.touched.passenger}
              margin="dense"
              id="passenger"
              name="passenger"
              label="passenger"
              type="number"
              fullWidth
              variant="standard"
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.passenger}
              helperText={transFormik.errors.passenger && transFormik.touched.passenger ? transFormik.errors.passenger : ''}
            />

            <TextField
              error={transFormik.errors.amount && transFormik.touched.amount}
              margin="dense"
              id="amount"
              name="amount"
              label="amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={transFormik.handleChange}
              onBlur={transFormik.handleBlur}
              value={transFormik.values.amount}
              helperText={transFormik.errors.amount && transFormik.touched.amount ? transFormik.errors.amount : ''}
            />


          </form>


          <Button type="submit" form="transport-form">
            Submit
          </Button>
        </div>



        <div class="col-4">
          <h2>Book Hotel</h2>


          <form onSubmit={hotelFormik.handleSubmit} style={{ padding: '0 20px' }} id="hotel-form">

            <TextField
              error={hotelFormik.errors.vendor_id && hotelFormik.touched.vendor_id}
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
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.vendor_id}
              helperText={hotelFormik.errors.vendor_id && hotelFormik.touched.vendor_id ? hotelFormik.errors.vendor_id : ''}
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
              error={hotelFormik.errors.service_id && hotelFormik.touched.service_id}
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
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.service_id}
              helperText={hotelFormik.errors.service_id && hotelFormik.touched.service_id ? hotelFormik.errors.service_id : ''}
            >
              <option value="">--Select service--</option>
              {service.service.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </TextField>

            <TextField
              error={hotelFormik.errors.checkin && hotelFormik.touched.checkin}
              margin="dense"
              id="checkin"
              name="checkin"
              label="checkin"
              type="text"
              fullWidth
              variant="standard"
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.checkin}
              helperText={hotelFormik.errors.checkin && hotelFormik.touched.checkin ? hotelFormik.errors.checkin : ''}

            />

            <TextField
              error={hotelFormik.errors.checkout && hotelFormik.touched.checkout}
              margin="dense"
              id="checkout"
              name="checkout"
              label="checkout"
              type="text"
              fullWidth
              variant="standard"
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.checkout}
              helperText={hotelFormik.errors.checkout && hotelFormik.touched.checkout ? hotelFormik.errors.checkout : ''}

            />

            <TextField
              error={hotelFormik.errors.datetime && hotelFormik.touched.datetime}
              margin="dense"
              id="datetime"
              name="datetime"
              type="datetime-local"
              fullWidth
              variant="standard"
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.datetime}
              helperText={hotelFormik.errors.datetime && hotelFormik.touched.datetime ? hotelFormik.errors.datetime : ''}

            />


            <TextField

              error={hotelFormik.errors.passenger && hotelFormik.touched.passenger}
              margin="dense"
              id="passenger"
              name="passenger"
              label="passenger"
              type="number"
              fullWidth
              variant="standard"
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.passenger}
              helperText={hotelFormik.errors.passenger && hotelFormik.touched.passenger ? hotelFormik.errors.passenger : ''}
            />

            <TextField

              error={hotelFormik.errors.amount && hotelFormik.touched.amount}
              margin="dense"
              id="amount"
              name="amount"
              label="amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={hotelFormik.handleChange}
              onBlur={hotelFormik.handleBlur}
              value={hotelFormik.values.amount}
              helperText={hotelFormik.errors.amount && hotelFormik.touched.amount ? hotelFormik.errors.amount : ''}
            />


          </form>
          <Button type="submit" form="hotel-form">
            Submit
          </Button>

        </div>

        <div class="col-4">

          <h2>Book Restaurant</h2>


          <form onSubmit={restaurantFormik.handleSubmit} style={{ padding: '0 20px' }} id="restaurant-form">

            <TextField
              error={restaurantFormik.errors.vendor_id && restaurantFormik.touched.vendor_id}
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
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.vendor_id}
              helperText={restaurantFormik.errors.vendor_id && restaurantFormik.touched.vendor_id ? restaurantFormik.errors.vendor_id : ''}
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
              error={restaurantFormik.errors.service_id && restaurantFormik.touched.service_id}
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
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.service_id}
              helperText={restaurantFormik.errors.service_id && restaurantFormik.touched.service_id ? restaurantFormik.errors.service_id : ''}
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

              error={restaurantFormik.errors.datetime && restaurantFormik.touched.datetime}
              margin="dense"
              id="datetime"
              name="datetime"
              type="datetime-local"
              fullWidth
              variant="standard"
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.datetime}
              helperText={restaurantFormik.errors.datetime && restaurantFormik.touched.datetime ? restaurantFormik.errors.datetime : ''}

            />

            <TextField

              error={restaurantFormik.errors.meals && restaurantFormik.touched.meals}
              margin="dense"
              id="meals"
              name="meals"
              label="No of meals"
              type="number"
              fullWidth
              variant="standard"
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.meals}
              helperText={restaurantFormik.errors.meals && restaurantFormik.touched.meals ? restaurantFormik.errors.meals : ''}
            />

            <TextField

              error={restaurantFormik.errors.passenger && restaurantFormik.touched.passenger}
              margin="dense"
              id="passenger"
              name="passenger"
              label="passenger"
              type="number"
              fullWidth
              variant="standard"
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.passenger}
              helperText={restaurantFormik.errors.passenger && restaurantFormik.touched.passenger ? restaurantFormik.errors.passenger : ''}
            />

            <TextField

              error={restaurantFormik.errors.amount && restaurantFormik.touched.amount}
              margin="dense"
              id="amount"
              name="amount"
              label="amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={restaurantFormik.handleChange}
              onBlur={restaurantFormik.handleBlur}
              value={restaurantFormik.values.amount}
              helperText={restaurantFormik.errors.amount && restaurantFormik.touched.amount ? restaurantFormik.errors.amount : ''}
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





















