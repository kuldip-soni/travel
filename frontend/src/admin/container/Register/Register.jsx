import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/slice/auth.slice';
import { useNavigate } from 'react-router-dom';



const gender = [
  {
    value: '',
    label: '--select gender--',
  },
  {
    value: 'mal',
    label: 'male',
  },
  {
    value: 'fem',
    label: 'female',
  },
  {
    value: 'non',
    label: 'other',
  },
];






function Register(props) {
  const dispatch = useDispatch();



  let registerschema = object({
    name: string().required('please enter name'),
    email: string().required('please enter email'),
    phone_number: string().required('please enter phone_number'),
    password: string().required('please enter password'),
    dob: string().required('please enter dob'),
    gender: string().required('please select gender'),
    address: string().required('please enter address'),
  
  });
  
  const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        phone_number: '',
        password: '',
        dob: '',
        gender: '',
        address: '',
      },
      validationSchema: registerschema,
      onSubmit: (values) => {
        dispatch(register(values))
        
        navigate("/login")
      }
    });
  
    console.log(formik.errors, formik.touched);
  return (
    <main>
      <section>
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between", marginTop: '50px' }}>
            <div className="col-5">
              <img src="assets/image/registration.png" alt="" width={"100%"} height={"500px"} />
            </div>
            <div className="col-6">
              <div className="register">
                <form onSubmit={formik.handleSubmit} id="registration-form">
                  <h3>Register</h3>
                  <div className="row">
                    <div className="col-12">
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
                    </div>
                    <div className="col-12">
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
                    </div>
                    <div className="col-12">
                      <TextField
                        error={formik.errors.phone_number && formik.touched.phone_number}
                        margin="dense"
                        id="phone_number"
                        name="phone_number"
                        label="phone number"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone_number}
                        helperText={formik.errors.phone_number && formik.touched.phone_number ? formik.errors.phone_number : ''}
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        error={formik.errors.password && formik.touched.password}
                        margin="dense"
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        error={formik.errors.dob && formik.touched.dob}
                        margin="dense"
                        id="dob"
                        name="dob"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob}
                        helperText={formik.errors.dob && formik.touched.dob ? formik.errors.dob : ''}
                      />
                    <br /><br />
                    </div>
                    <div className="col-12">
                      <TextField
                        error={formik.errors.gender && formik.touched.gender}
                        id="standard-select-currency-native"
                        name="gender"
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
                        value={formik.values.gender}
                        helperText={formik.errors.gender && formik.touched.gender ? formik.errors.gender : ''}
                      >
                        {gender.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}

                      </TextField>
                    </div>
                    <div className="col-12">
                      <TextField
                        error={formik.errors.address && formik.touched.address}
                        margin="dense"
                        id="address"
                        name="address"
                        label="address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        helperText={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
                      />                    
                      </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="Register"
                        className="btn"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;