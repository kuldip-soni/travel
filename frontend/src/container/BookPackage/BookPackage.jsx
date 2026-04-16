import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { array, number, object, string } from 'yup';
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
        passengers: array().of(
            object({
                name: string().required('Name required'),
                age: number().required('Age required').positive().integer()
            })
        ).min(1, 'At least one passenger required')
    });

    const formik = useFormik({
        initialValues: {
            location_id: '',
            package_id: '',
            travel_date: '',
            passengers: [
                { name: '', age: '' }
            ],
        },
        validationSchema: bookpackageschema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(bookpackage({ ...values, amount: price * formik.values.passengers?.length }))
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



    console.log(formik.errors, formik.touched, formik.values.passengers);

    const price = packagedata.package?.find(v => v.id == formik.values.package_id)?.price;
    console.log(price);




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
                                        sx={{
                                            '& input::placeholder': {
                                                fontSize: '50px',
                                                opacity: 1, // important for visibility
                                            }
                                        }}

                                    >
                                        {locationdata.location.map((v) => (
                                            <MenuItem key={v.id} value={v.id} sx={{ fontSize: '18px' }}
                                            >
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
                                    <div style={{ marginTop: "20px" }}>

                                        {/* Header */}
                                        <div style={{ display: "flex", gap: "10px", fontWeight: "600", marginBottom: "8px" }}>
                                            <div style={{ flex: 1 }}>Name</div>
                                            <div style={{ width: "120px" }}>Age</div>
                                            <div style={{ width: "50px" }}></div>
                                        </div>

                                        {formik.values.passengers?.map((p, index) => (
                                            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>

                                                {/* Name */}
                                                <TextField
                                                    label="Name"
                                                    name={`passengers[${index}].name`}
                                                    value={p.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    fullWidth
                                                />

                                                {/* Age */}
                                                <TextField
                                                    label="Age"
                                                    type="number"
                                                    name={`passengers[${index}].age`}
                                                    value={p.age}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    style={{ width: "120px" }}
                                                />

                                                {/* Remove */}
                                                <Button
                                                    type="button"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        const updated = [...formik.values.passengers];
                                                        updated.splice(index, 1);
                                                        formik.setFieldValue("passengers", updated);
                                                    }}
                                                >
                                                    X
                                                </Button>
                                            </div>
                                        ))}

                                        {/* Add Button */}
                                        <Button
                                            type="button"
                                            variant="contained"
                                            size="small"
                                            onClick={() => {
                                                formik.setFieldValue("passengers", [
                                                    ...(formik.values.passengers || []),
                                                    { name: "", age: "" }
                                                ]);
                                            }}
                                        >
                                            + Add Passenger
                                        </Button>
                                    </div>

                                    <br /><br />

                                    <div style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "12px",
                                        padding: "16px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                        maxWidth: "300px"
                                    }}>
                                        <h3 style={{
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            marginBottom: "12px",
                                            color: "#374151"
                                        }}>
                                            Booking Summary
                                        </h3>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "8px",
                                            color: "#6b7280"
                                        }}>
                                            <span>Per Person</span>
                                            <span style={{ fontWeight: "500", color: "#111827" }}>
                                                ₹{price || 0}
                                            </span>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                            color: "#6b7280"
                                        }}>
                                            <span>No. of People</span>
                                            <span style={{ fontWeight: "500", color: "#111827" }}>
                                                {formik.values.passengers?.length || 0}
                                            </span>
                                        </div>

                                        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: "18px",
                                            fontWeight: "700"
                                        }}>
                                            <span>Total</span>
                                            <span style={{ color: "#16a34a" }}>
                                                ₹{(price || 0) * (formik.values.passengers?.length || 0)}
                                            </span>
                                        </div>
                                    </div>
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