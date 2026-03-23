import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { addroom, delroom, getroom, putroom } from '../../../redux/slice/room.slice';

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


function Room(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);

  const roomdata = useSelector(state => state.room);
  console.log(roomdata);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getroom());

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

  let Roomschema = object({
    name: string().required('please enter name'),
    description: string().required('please enter description'),
    price: string().required('please enter price'),
    room_img: mixed().required('please upload room image')




  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      room_img: '',






    },
    validationSchema: Roomschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(putroom(values));

      } else {

        dispatch(addroom(values));
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

    { field: 'name', headername: 'name', width: 130 },
    { field: 'description', headername: 'description', width: 130 },
    { field: 'price', headername: 'price', width: 130 },
    {
      field: 'room_img',
      headername: 'room_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.room_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headername: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delroom(parms.row.id))}>
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
        <h1>Room</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Room
        </Button>
      </Box>

      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Room</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">


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

                error={formik.errors.description && formik.touched.description}
                margin="dense"
                id="description"
                name="description"
                label="description"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
              />

              <TextField

                error={formik.errors.price && formik.touched.price}
                margin="dense"
                id="price"
                name="price"
                label="price"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                helperText={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
              />

              <br /><br />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog room_img
                <VisuallyHiddenInput
                  error={formik.errors.room_img && formik.touched.room_img}
                  type="file"
                  name='room_img'

                  onChange={(event) => formik.setFieldValue("room_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.room_img == 'string' ?
                "http://localhost:4000/" + formik.values.room_img :
                URL.createObjectURL(formik.values.room_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.room_img && formik.touched.room_img ?
                <span classname='error'>{formik.errors.room_img}</span> :
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
              rows={roomdata.room}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />

    </div>
  );
}

export default Room;