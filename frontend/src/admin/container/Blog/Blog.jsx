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
    setupdate(false)
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

    blog_img: mixed().required('please upload Blog blog_img'),
    title: string().required('please enter title'),
    date: string().required('please select date'),
    description: string().required('please enter description'),



  });


  const formik = useFormik({
    initialValues: {

      blog_img: '',
      title: '',
      date: '',
      description: '',

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
      field: 'blog_img',
      headerName: 'blog_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.blog_img} width={'50px'} height={'50px'} />
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

                error={formik.errors.title && formik.touched.title}
                margin="dense"
                id="title"
                name="title"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                helperText={formik.errors.title && formik.touched.title ? formik.errors.title : ''}
              />

              <TextField

                error={formik.errors.date && formik.touched.date}
                margin="dense"
                id="date"
                name="date"
                type="date"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                helperText={formik.errors.date && formik.touched.date ? formik.errors.date : ''}
              />

              <TextField

                error={formik.errors.description && formik.touched.description}
                margin="dense"
                id="description"
                name="description"
                label="description"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
              />

              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog blog_img
                <VisuallyHiddenInput
                  error={formik.errors.blog_img && formik.touched.blog_img}
                  type="file"
                  name='blog_img'

                  onChange={(event) => formik.setFieldValue("blog_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.blog_img == 'string' ?
                "http://localhost:4000/" + formik.values.blog_img :
                URL.createObjectURL(formik.values.blog_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.blog_img && formik.touched.blog_img ?
                <span className='error'>{formik.errors.blog_img}</span> :
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