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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { addroom, getroom } from '../../../redux/slice/room.slice';

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
    Name: string().required('please enter Name'),
    Description: string().required('please enter Description'),
    Price: string().required('please enter Price'),
    room_img: mixed().required('please upload room image')




  });
  const formik = useFormik({
    initialValues: {
      Name: '',
      Description: '',
      Price: '',
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

    { field: 'name', headerName: 'name', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },
    {
      field: 'room_img',
      headerName: 'room_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.room_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headerName: 'Action', width: 130,
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

                error={formik.errors.Name && formik.touched.Name}
                margin="dense"
                id="Name"
                name="Name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
                helperText={formik.errors.Name && formik.touched.Name ? formik.errors.Name : ''}
              />

              <TextField

                error={formik.errors.Description && formik.touched.Description}
                margin="dense"
                id="Description"
                name="Description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Description}
                helperText={formik.errors.Description && formik.touched.Description ? formik.errors.Description : ''}
              />

              <TextField

                error={formik.errors.Price && formik.touched.Price}
                margin="dense"
                id="Price"
                name="Price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Price}
                helperText={formik.errors.Price && formik.touched.Price ? formik.errors.Price : ''}
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
                <span className='error'>{formik.errors.room_img}</span> :
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