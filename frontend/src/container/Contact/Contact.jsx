import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { addcontect } from '../../redux/slice/contect.slice';
import { useDispatch } from 'react-redux';


function Contact(props) {
        const dispatch = useDispatch();

    let contectschema = object({
        
        name: string().required('please enter name'),
        email: string().required('please enter email'),
        mobile_no: string().required('please enter mobile_no'),
        subject: string().required('please enter subject'),
        message: string().required('please select message'),

    
        });

        const formik = useFormik({
                initialValues: {
        
                    name: '',
                    email: '',
                    mobile_no: '',
                    subject: '',
                    message: '',
        
        
        
                },
                validationSchema: contectschema,

                 onSubmit: (values, { resetForm }) => {
                            console.log(values);
                           dispatch(addcontect(values))
                            resetForm();
                           
                        },
                    });
    
    return (
        <div>
            <main>
                <section id="Contact">
                                <div className="container">
                                    <h2 className="main-title">Contact</h2>
                                    
                                    <div className="row all-Contact">
                                        <div className="col-lg-5">
                
                                            <form onSubmit={formik.handleSubmit} id="contect-form">
                                                <TextField
                
                                                    error={formik.errors.name && formik.touched.name}
                                                    margin="dense"
                                                    id="name"
                                                    name="name"
                                                    label="name"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.name}
                                                    helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                                                />
                                                <TextField
                
                                                    error={formik.errors.email && formik.touched.email}
                                                    margin="dense"
                                                    id="email"
                                                    name="email"
                                                    label="email"
                                                    type="email"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                                />

                                                  <TextField
                
                                                    error={formik.errors.mobile_no && formik.touched.mobile_no}
                                                    margin="dense"
                                                    id="mobile_no"
                                                    name="mobile_no"
                                                    label="mobile_no"
                                                    type="number"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.mobile_no}
                                                    helperText={formik.errors.mobile_no && formik.touched.mobile_no ? formik.errors.mobile_no : ''}
                                                />
                                                
                                                <TextField
                
                                                    error={formik.errors.subject && formik.touched.subject}
                                                    margin="dense"
                                                    id="subject"
                                                    name="subject"
                                                    label="subject"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.subject}
                                                    helperText={formik.errors.subject && formik.touched.subject ? formik.errors.subject : ''}
                                                />
                                                <TextField
                
                                                    error={formik.errors.message && formik.touched.message}
                                                    margin="dense"
                                                    id="message"
                                                    name="message"
                                                    label="message"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.message}
                                                    helperText={formik.errors.message && formik.touched.message ? formik.errors.message : ''}
                                                />
                                                <input type="submit" defaultValue="Send Message" className="btn" />
                                            </form>
                            </div>
                </div>
            </div>               
                            
            </section>
            </main>
</div>
        
            
        
    );
}

export default Contact;