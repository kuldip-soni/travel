import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { object, string } from 'yup';


function Login(props) {
    let loginschema = object({
        email: string().required('please enter email'),
        password: string().required('please enter password'),
    });
        
      const formik = useFormik({
          initialValues: {
            email: '',
            password: '',

          },
          validationSchema: loginschema,
          onSubmit: (values) => {
            console.log(values);
          }
        });

        console.log(formik.errors, formik.touched);

      
    return (
           <main>
      <section>
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between", marginTop: '50px' }}>
            <div className="col-5">
                <img src="assets/image/login.png" alt="" width={"100%"} height={"500px"} />
            </div>
            <div className="col-6">
              <div className="login">
                <form onSubmit={formik.handleSubmit} id="login-form">
                  <h3>Login</h3>
                  <div className="row">
                    
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
                      <input
                        type="submit"
                        defaultValue="login"
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

export default Login;