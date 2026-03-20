import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { addblog, delblog, getblog, putblog } from '../../../redux/slice/blog.slice';

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
  const [update, setupdate] = useState(false);

  const blogdata = useSelector(state => state.blog);
  console.log(blogdata);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getblog());

  }, []);


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

    Blog_img: mixed().required('please upload Blog Blog_img'),
    Title: string().required('please enter Title'),
    Date: string().required('please select Date'),
    Description: string().required('please enter Description'),



  });


  const formik = useFormik({
    initialValues: {

      Blog_img: '',
      Title: '',
      Date: '',
      Description: '',

    },
    validationSchema: Blogschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(putblog(values));

      } else {

        dispatch(addblog(values));
      }


      handleClose();
      resetForm();


    },
  });

  const handleEdit = (data) => {
    console.log(data);
    handleClickOpen();
    formik.setValues(data);
    setupdate(true);

  }
  const columns = [

    { field: 'title', headerName: 'title', width: 130 },
    { field: 'date', headerName: 'date', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    {
      field: 'Blog_img',
      headerName: 'Blog_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.Blog_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delblog(parms.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },


  ];


  const paginationModel = { page: 0, pageSize: 5 };

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

                error={formik.errors.Title && formik.touched.Title}
                margin="dense"
                id="Title"
                name="Title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Title}
                helperText={formik.errors.Title && formik.touched.Title ? formik.errors.Title : ''}
              />

              <TextField

                error={formik.errors.Date && formik.touched.Date}
                margin="dense"
                id="Date"
                name="Date"
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Date}
                helperText={formik.errors.Date && formik.touched.Date ? formik.errors.Date : ''}
              />

              <TextField

                error={formik.errors.Description && formik.touched.Description}
                margin="dense"
                id="Description"
                name="Description"
                label="Description"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Description}
                helperText={formik.errors.Description && formik.touched.Description ? formik.errors.Description : ''}
              />

              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog Blog_img
                <VisuallyHiddenInput
                  error={formik.errors.Blog_img && formik.touched.Blog_img}
                  type="file"
                  name='Blog_img'

                  onChange={(event) => formik.setFieldValue("Blog_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.Blog_img == 'string' ?
                "http://localhost:4000/" + formik.values.Blog_img :
                URL.createObjectURL(formik.values.Blog_img)}
                width={'50px'} height={'50px'} />
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

      <DataGrid
        rows={blogdata.blog}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

    </div>
  );
}

export default Blog;