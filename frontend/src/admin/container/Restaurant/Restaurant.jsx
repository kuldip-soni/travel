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

const vendor = [
  {
    value: '',
    label: '--select vendor--',
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

const service = [
  {
    value: '',
    label: '--select service--',
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

function Restaurant(props) {
  const [open, setOpen] = React.useState(false);
      const [update, setupdate] = useState(false);
  
      const restaurantdata = useSelector(state => state.restaurant);
    const vendor = useSelector(state => state.vendor);
    const  service = useSelector(state => state.service);
    console.log(restaurantdata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getrestaurant());
        dispatch(getvendor());
        dispatch(getservice());

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

  let Restaurantschema = object({
    vendor: string().required('please select vendor'),
    service: string().required('please select service'),
    Datetime: string().required('please select Datetime'),
    meals: string().required('please enter no of meals'),
    Passenger: string().required('please enter Passenger'),
    Amount: string().required('please enter Amount'),
        restaurant_img: mixed().required('please upload restaurant image'),
    

  });
  const formik = useFormik({
    initialValues: {
      vendor: '',
      service: '',
      Datetime: '',
      meals: '',
      Passenger: '',
      Amount: '',
      restaurant_img:'',

    },


    validationSchema: Restaurantschema,

    onSubmit: (values, { resetForm }) => {
         console.log(values);
         if (update) {
           console.log("update data");
           dispatch(putrestaurant(values));
         } else {
           dispatch(addrestaurant(values));
   
         }
         resetForm();
         handleClose()
       },
  });

  const handleEdit = (data) => {
    console.log(data);
    handleClickOpen();
    formik.setValues(data);
    setupdate(true);

  }

  const columns = [

    { field: 'from', headerName: 'from', width: 130 },
    { field: 'to', headerName: 'to', width: 130 },
    { field: 'datetime', headerName: 'datetime', width: 130 },
    { field: 'passenger', headerName: 'passenger', width: 130 },
    { field: 'amount', headerName: 'amount', width: 130 },
    { field: 'passenger', headerName: 'passenger', width: 130 },
    {
      field: 'restaurant_img',
      headerName: 'restaurant_img',
      width: 130,
      renderCell: (params) => (
        <img src={"http://localhost:4000/" + params.row.restaurant_img} width={'50px'} height={'50px'} />
      )
    },




    {
      headerName: 'Action', width: 130,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(delrestaurant(parms.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
  ];

  console.log(formik.errors);




  const paginationModel = { page: 0, pageSize: 5 };

  console.log(formik.errors, formik.touched);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Restaurant</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Restaurant
        </Button>
      </Box>
      <React.Fragment>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Restaurant</DialogTitle>
          <DialogContent>

            <form onSubmit={formik.handleSubmit} id="subscription-form">

              <TextField
                error={formik.errors.vendor && formik.touched.vendor}
                id="standard-select-currency-native"
                name="vendor"
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
                value={formik.values.vendor}
                helperText={formik.errors.vendor && formik.touched.vendor ? formik.errors.vendor : ''}
              >
                <option value="">--Select vendor--</option>
                {vendor.vendor.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.type}
                  </option>
                ))}
              </TextField>
              <br /><br />
              <TextField
                error={formik.errors.service && formik.touched.service}
                id="standard-select-currency-native"
                name="service"
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
                value={formik.values.service}
                helperText={formik.errors.service && formik.touched.service ? formik.errors.service : ''}
              >
                 <option value="">--Select service--</option>
                {service.service.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.city}
                  </option>
                ))}
              </TextField>
              <br /><br />

              <TextField

                error={formik.errors.Datetime && formik.touched.Datetime}
                margin="dense"
                id="Datetime"
                name="Datetime"
                type="datetime-local"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Datetime}
                helperText={formik.errors.Datetime && formik.touched.Datetime ? formik.errors.Datetime : ''}

              />

              <TextField

                error={formik.errors.meals && formik.touched.meals}
                margin="dense"
                id="meals"
                name="meals"
                label="No of meals"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.meals}
                helperText={formik.errors.meals && formik.touched.meals ? formik.errors.meals : ''}
              />

              <TextField

                error={formik.errors.Passenger && formik.touched.Passenger}
                margin="dense"
                id="Passenger"
                name="Passenger"
                label="Passenger"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Passenger}
                helperText={formik.errors.Passenger && formik.touched.Passenger ? formik.errors.Passenger : ''}
              />

              <TextField

                error={formik.errors.Amount && formik.touched.Amount}
                margin="dense"
                id="Amount"
                name="Amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Amount}
                helperText={formik.errors.Amount && formik.touched.Amount ? formik.errors.Amount : ''}
              />

              <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload  Blog restaurant_img
                <VisuallyHiddenInput
                  error={formik.errors.restaurant_img && formik.touched.restaurant_img}
                  type="file"
                  name='restaurant_img'

                  onChange={(event) => formik.setFieldValue("restaurant_img", event.target.files[0])}

                  onBlur={formik.handleBlur}
                //onChange={(event) => console.log(event.target.files)}

                />
              </Button>
              <img src={typeof formik.values.restaurant_img == 'string' ?
                "http://localhost:4000/" + formik.values.restaurant_img :
                URL.createObjectURL(formik.values.restaurant_img)}
                width={'50px'} height={'50px'} />
              <br />

              {formik.errors.restaurant_img && formik.touched.restaurant_img ?
                <span className='error'>{formik.errors.restaurant_img}</span> :
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
              rows={restaurantdata.restaurant}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />

    </div>
  );
}

export default Restaurant;