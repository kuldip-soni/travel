import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { bookpackage } from '../../redux/slice/bookpackage.slice';
import { useNavigate } from 'react-router-dom';

function BookPackage(props) {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getlocation());

        dispatch(getpackage());

    }, []);

    const locationdata = useSelector(State => State.location);
    console.log(locationdata.location);

    const auth =useSelector(state => state.auth)

    const packagedata = useSelector(State => State.package);
    console.log(packagedata.package);


    const [update, setupdate] = useState(false);

    const handleClose = () => { };
    const handleClickOpen = () => { };

    let bookpackageschema = object({
        location_id: string().required('please select location'),
        package_id: string().required('please select package'),
        travel_date: string().required('please enter travel_date'),
        passenger: string().required('please enter no passenger'),
    });

    const formik = useFormik({
        initialValues: {

            location_id: '',
            package_id: '',
            travel_date: '',
            passenger: '',



        },
        validationSchema: bookpackageschema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(bookpackage(values))
            resetForm();
            navigate("/myBooking")

        },
    });

    const handleEdit = (data) => {
        console.log(data);
        handleClickOpen();
        formik.setValues(data);
        setupdate(true);

    }
      const navigate=useNavigate();
      if(auth.user == null){
        navigate("/login")
      }
    
    
    
    console.log(formik.errors, formik.touched, formik.values.location_id);
    return (
        <div className="row all-Contact">
            <div className="col-lg-5" style={{ padding: "50px" }}>
                <h2>Book Your package</h2>
                <br /><br />
                <form onSubmit={formik.handleSubmit} id="bookpackage-form" >
                    <TextField
                        error={formik.errors.location_id && formik.touched.location_id}
                        id="standard-select-currency-native"
                        name="location_id"
                        select
                        fullWidth
                        inputProps={{ style: { fontSize: 18 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input text

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
                          <option >---location---</option>
                        {locationdata.location.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </TextField>
                    <br /><br />
                    <TextField
                        error={formik.errors.package_id && formik.touched.package_id}
                        id="standard-select-currency-native"
                        name="package_id"
                        select
                        fullWidth
                         inputProps={{ style: { fontSize: 18 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input text

                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.package_id}
                        helperText={formik.errors.package_id && formik.touched.package_id ? formik.errors.package_id : ''}
                    >
                        <option>---package---</option>
                        {packagedata.package.filter(v1 => v1.location_id == formik.values.location_id).map((v1) => (
                            <option key={v1.id} value={v1.id}>
                                {v1.name}
                            </option>
                        ))}
                    </TextField>
                    <br /><br />


                    <TextField

                        error={formik.errors.travel_date && formik.touched.travel_date}
                        margin="dense"

                        id="travel_date"
                        name="travel_date"
                        type="date"
                        fullWidth
                         inputProps={{ style: { fontSize: 18 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input text
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.travel_date}
                        helperText={formik.errors.travel_date && formik.touched.travel_date ? formik.errors.travel_date : ''}
                    />

                    <TextField

                        error={formik.errors.passenger && formik.touched.passenger}
                        margin="dense"
                        id="passenger"
                        name="passenger"
                        label="passenger"
                        type="number"
                        fullWidth
                         inputProps={{ style: { fontSize: 18 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input text
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passenger}
                        helperText={formik.errors.passenger && formik.touched.passenger ? formik.errors.passenger : ''}
                    />
                    <input type="submit" defaultValue="Book Package" className="btn" />
                </form>

            </div>
        </div>
    );
}

export default BookPackage;