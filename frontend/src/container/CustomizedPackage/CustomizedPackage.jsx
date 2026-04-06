import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { getvendor } from '../../redux/slice/vendor.slice';
import { getservice } from '../../redux/slice/service.slice';


function CustomizedPackage(props) {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getvendor());

        dispatch(getservice());

    }, []);

    const vendordata = useSelector(State => State.vendor);
    console.log(vendordata.vendor);

    const servicedata = useSelector(State => State.service);
    console.log(servicedata.service);

     const [update, setupdate] = useState(false);
    
        const handleClose = () => { };
        const handleClickOpen = () => { };

         let custompackageschema = object({
                vendor_id: string().required('please select vendor'),
                service_id: string().required('please select service'),
                travel_date: string().required('please enter travel_date'),
                passenger: string().required('please enter no passenger'),
            });
        
            const formik = useFormik({
                initialValues: {
        
                    vendor_id: '',
                    service_id: '',
                    travel_date: '',
                    passenger: '',
        
        
        
                },
                validationSchema: custompackageschema,
        
                onSubmit: (values, { resetForm }) => {
                    console.log(values);
                    dispatch(bookpackage(values))
                    resetForm();
                  
        
                },
            });
        
            const handleEdit = (data) => {
                console.log(data);
                handleClickOpen();
                formik.setValues(data);
                setupdate(true);
        
            }

         

    return (
        <div>
            <section id="Popular-Packages">
                <div className="container">
                    <h2 className="main-title"> Customized your Packages</h2>
                    <p className="sub-title">
                        Our travel management system offers customization of travel packages to meet the needs of different types of users. These packages include arrangements for transportation, accommodation, and sightseeing activities.
                    </p>

                    <form onSubmit={formik.handleSubmit} id="custompackage-form" >
                        <TextField
                            error={formik.errors.vendor_id && formik.touched.vendor_id}
                            id="standard-select-currency-native"
                            name="vendor_id"
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
                            value={formik.values.vendor_id}
                            helperText={formik.errors.vendor_id && formik.touched.vendor_id ? formik.errors.vendor_id : ''}
                        >
                            <option >---vendor---</option>
                            {vendordata.vendor.map((v) => (
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
                            value={formik.values.service_id}
                            helperText={formik.errors.service_id && formik.touched.service_id ? formik.errors.service_id : ''}
                        >
                            <option>---service---</option>
                            
                              {servicedata.service.filter(v1 => v1.vendor_id == formik.values.vendor_id).map((v1)=> (
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
                        <input type="submit" defaultValue="create package" className="btn" />
                    </form>






                </div>
            </section>

        </div>
    );
}

export default CustomizedPackage;