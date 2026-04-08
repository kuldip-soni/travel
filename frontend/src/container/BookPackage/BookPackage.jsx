import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { bookpackage } from '../../redux/slice/bookpackage.slice';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, MenuItem } from '@mui/material';



function BookPackage(props) {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getlocation());

        dispatch(getpackage());

    }, []);

    const locationdata = useSelector(State => State.location);
    console.log(locationdata.location);

    const auth = useSelector(state => state.auth)

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
    const navigate = useNavigate();
    if (auth.user == null) {
        navigate("/login")
    }



    console.log(formik.errors, formik.touched, formik.values.location_id);
    return (
        <main style={{ background: "#f5f7fb", minHeight: "100vh", padding: "40px 0", marginTop: "60px" }}>
            <div className="container">

                <h2 style={{
                    textAlign: "center",
                    fontWeight: "700",
                    marginBottom: "10px",
                    fontSize: "30px"
                }}>
                    Book your Package
                </h2>
                <Card elevation={5} style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className="row">

                        {/* LEFT IMAGE */}
                        <div className="col-lg-6 d-none d-lg-block">
                            <img
                                src="assets/image/bookingimg.png"
                                alt="booking"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>

                        {/* RIGHT FORM */}
                        <div className="col-lg-6">
                            <CardContent style={{ padding: "40px" }}>



                                <form onSubmit={formik.handleSubmit}>

                                    {/* LOCATION */}
                                    <TextField
                                        select
                                        label="Select Location"
                                        name="location_id"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={formik.values.location_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.location_id && Boolean(formik.errors.location_id)}
                                        helperText={formik.touched.location_id && formik.errors.location_id}
                                        InputLabelProps={{
                                            style: { fontSize: '18px', color: '#555' }  // Label font size
                                        }}
                                        inputProps={{
                                            style: { fontSize: '18px' } // Input text (what user types) font size
                                        }}
                                    >
                                        {locationdata.location.map((v) => (
                                            <MenuItem key={v.id} value={v.id}>
                                                {v.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {/* PACKAGE */}
                                    <TextField
                                        select
                                        label="Select Package"
                                        name="package_id"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={formik.values.package_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.package_id && Boolean(formik.errors.package_id)}
                                        helperText={formik.touched.package_id && formik.errors.package_id}
                                        InputLabelProps={{
                                            style: { fontSize: '18px', color: '#555' }  // Label font size
                                        }}
                                        inputProps={{
                                            style: { fontSize: '18px' } // Input text (what user types) font size
                                        }}
                                    >
                                        {packagedata.package
                                            .filter(v => v.location_id == formik.values.location_id)
                                            .map((v) => (
                                                <option key={v.id} value={v.id}>
                                                    {v.name}
                                                </option>
                                            ))}
                                    </TextField>

                                    {/* DATE */}
                                    <TextField
                                        label="Travel Date"
                                        type="date"
                                        name="travel_date"
                                        fullWidth
                                        margin="normal"
                                        // InputLabelProps={{ shrink: true }}
                                        value={formik.values.travel_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.travel_date && Boolean(formik.errors.travel_date)}
                                        helperText={formik.touched.travel_date && formik.errors.travel_date}

                                        InputLabelProps={{
                                            shrink: true, // Ensures label stays at the top
                                            style: { fontSize: '18px' } // Adjusts font size of the label
                                        }}
                                        // Use inputProps (lowercase 'i') for placeholder text sizing
                                        inputProps={{
                                            style: { fontSize: '18px' } // Adjusts font size of the date input
                                        }}


                                    />

                                    {/* PASSENGERS */}
                                    <TextField 
                                        label="Passengers"
                                        type="number"
                                        name="passenger"
                                        fullWidth
                                        margin="normal"
                                        value={formik.values.passenger}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.passenger && Boolean(formik.errors.passenger)}
                                        helperText={formik.touched.passenger && formik.errors.passenger}
                                        InputLabelProps={{
                                            style: { fontSize: '18px', color: '#555' }  // Label font size
                                        }}
                                        inputProps={{
                                            style: { fontSize: '18px' } // Input text (what user types) font size
                                        }}
                                    />

                                    {/* BUTTON */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        style={{
                                            marginTop: "20px",
                                            padding: "12px",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        Book Now 🚀
                                    </Button>

                                </form>

                            </CardContent>
                        </div>
                    </div>
                </Card>

            </div>
        </main>
    );
}

export default BookPackage;