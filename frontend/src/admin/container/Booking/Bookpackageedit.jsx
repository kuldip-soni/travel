import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { mixed, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getvendor } from '../../../redux/slice/vendor.slice';
import { getservice } from '../../../redux/slice/service.slice';
import { gettransport } from '../../../redux/slice/transport.slice';

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
  const vendor = useSelector(state => state.vendor);
  const service = useSelector(state => state.service);
  console.log(transportdata);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(gettransport());
    dispatch(getvendor());
    dispatch(getservice());

  }, []);

    let Transportschema = object({
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
        
          resetForm();
          handleClose()
        },
      });

    
    
    return (
        <div>
            <h2>Book package</h2>
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
                <option value="">--Select vendor--</option>
                {vendor.vendor.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.type}
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

              
             

             <Button type="submit" form="subscription-form">
              Submit
            </Button>



            </form>

        </div>
    );
}

export default Bookpackageedit;