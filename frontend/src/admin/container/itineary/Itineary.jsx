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
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { additineary, delitineary, getitineary, putitineary } from '../../../redux/slice/itineary.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getpackage } from '../../../redux/slice/package.slice';


const package_id = [
  {
    value: '',
    label: '--select package--',
  },
  {
    value: 'ind',
    label: 'india',
  },
  {
    value: 'jpn',
    label: 'japan',
  },
  {
    value: 'usa',
    label: 'usa',
  },
];

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


function Itineary(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);


  const itinearydata = useSelector(state => state.itineary);
  const Package = useSelector(state => state.package);

  console.log(itinearydata);


  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getitineary());
    dispatch(getpackage());



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

  let itinearyschema = object({
    itineary_img: mixed().required('please upload itineary itineary_img'),
    package_id: string().required('please select  package'),
    title: string().required('please enter title'),
    description: string().required('please enter description'),

  });

  const formik = useFormik({
    initialValues: {
      itineary_img: '',
      package_id: '',
      title: '',
      description: '',



    },
    validationSchema: itinearyschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        console.log("update data");
        dispatch(putitineary(values));
        dispatch((values));

      } else {

        dispatch(additineary(values));
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

    { field: 'package_id', 
      headerName: 'package_id',
       width: 130,
       renderCell: (params) => {
                const d = Package.package?.find(v => v.id == params.row.package_id)?.name
                console.log(Package.package, params.row.id, d);
                
                return d
             } },
    { field: 'title', headerName: 'title', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },

    {
      field: 'itineary_img',
      headerName: 'itineary_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.itineary_img} width={'50px'} height={'50px'} />
      )
    },
    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => dispatch(delitineary(parms.row.id))}>
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
        <h1>Itineary</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Itineary
        </Button>

      </Box>
      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Itineary</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">
              <TextField
                error={formik.errors.package_id && formik.touched.package_id}
                id="standard-select-currency-native"
                name="package_id"
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
                value={formik.values.package_id}
                helperText={formik.errors.package_id && formik.touched.package_id ? formik.errors.package_id : ''}
              >
                <option>---package---</option>
                {Package.package.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </TextField>



              <TextField
                error={formik.errors.title && formik.touched.title}
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                helperText={formik.errors.title && formik.touched.title ? formik.errors.title : ''}
              />

              <TextField
                error={formik.errors.description && formik.touched.description}
                margin="dense"
                id="description"
                name="description"
                label="Description"
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

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog itineary_img
                <VisuallyHiddenInput
                  error={formik.errors.itineary_img && formik.touched.itineary_img}
                  type="file"
                  name='itineary_img'

                  onChange={(event) => formik.setFieldValue("itineary_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.itineary_img == 'string' ?
                "http://localhost:4000/" + formik.values.itineary_img :
                URL.createObjectURL(formik.values.itineary_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.itineary_img && formik.touched.itineary_img ?
                <span className='error'>{formik.errors.itineary_img}</span> :
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
        rows={itinearydata.itineary}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

    </div>
  );
}

export default Itineary;