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
               <section
  id="Contact"
  style={{
    padding: '60px 20px',
    backgroundColor: '#f8f8f8',
    fontFamily: 'Georgia, serif',
  }}
>
  <div
    style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
    }}
  >
    <h2
      style={{
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '30px',
        color: '#222',
      }}
    >
      Contact
    </h2>

    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      <TextField
        error={formik.errors.name && formik.touched.name}
        label="Name"
        name="name"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        error={formik.errors.email && formik.touched.email}
        label="Email"
        name="email"
        type="email"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        error={formik.errors.mobile_no && formik.touched.mobile_no}
        label="Mobile Number"
        name="mobile_no"
        type="tel"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.mobile_no}
        helperText={formik.touched.mobile_no && formik.errors.mobile_no}
      />

      <TextField
        error={formik.errors.subject && formik.touched.subject}
        label="Subject"
        name="subject"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.subject}
        helperText={formik.touched.subject && formik.errors.subject}
      />

      <TextField
        error={formik.errors.message && formik.touched.message}
        label="Message"
        name="message"
        multiline
        rows={4}
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        helperText={formik.touched.message && formik.errors.message}
      />

      <button
        type="submit"
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          border: '1px solid #444',
          borderRadius: '5px',
          backgroundColor: '#fff',
          color: '#444',
          fontSize: '16px',
          cursor: 'pointer',
          transition: '0.2s ease',
        }}
        onMouseOver={e => {
          e.currentTarget.style.backgroundColor = '#444';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={e => {
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.color = '#444';
        }}
      >
        Send Message
      </button>

    </form>
  </div>
</section>
            </main>
</div>
        
            
        
    );
}

export default Contact;