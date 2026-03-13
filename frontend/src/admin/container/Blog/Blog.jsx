import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function Blog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  let Blogschema = object({

    Blog_img: mixed().required('please upload Blog image'),


  });


  const formik = useFormik({
    initialValues: {

      Blog_img: '',

    },
    validationSchema: Blogschema,

    onSubmit: values => {
      console.log(values);

    },
  });

  console.log(formik.errors, formik.touched);
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Blog</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Blog
        </Button>
      </Box>

      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Blog</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">


              <TextField
               
                margin="dense"
                id="Title"
                name="Title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
                
                margin="dense"
                id="Date"
                name="Date"
                label="Date"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
                
                margin="dense"
                id="Description"
                name="Description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
              />

              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog image
                <VisuallyHiddenInput
                  error={formik.errors.Blog_img && formik.touched.Blog_img}
                  type="file"
                  name='Blog_img'

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Blog_img}

                  //onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <br />

              {formik.errors.Blog_img && formik.touched.Blog_img ?
                <span className='error'>{formik.errors.Blog_img}</span> :
                ''}




            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

    </div>
  );
}

export default Blog;