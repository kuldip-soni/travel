import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { object, string } from 'yup';


function Contact(props) {
    let contectschema = object({
            name: string().required('please enter name'),
            email: string().required('please enter email'),
            subject: string().required('please enter subject'),
            message: string().required('please select message'),
    
    
    
        });

        const formik = useFormik({
                initialValues: {
        
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
        
        
        
                },
                validationSchema: contectschema,

                 onSubmit: (values, { resetForm }) => {
                            console.log(values);
                           
                            resetForm();
                            handleClose();
                        },
                    });
    
    return (
        <div>
            <main>
                <section id="Contact">
                                <div className="container">
                                    <h2 className="main-title">Contact</h2>
                                    <p className="sub-title">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
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