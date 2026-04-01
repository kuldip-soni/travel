import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getcontect, putcontect } from '../../../redux/slice/contect.slice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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

function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);

    const contectdata = useSelector(state => state.contect);
    console.log(contectdata);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getcontect());

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

    let contactschema = object({
        remark: string().required('please enter remark'),
    });
    const formik = useFormik({
        initialValues: {
            remark:''
        },
        validationSchema: contactschema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);

            dispatch(putcontect(values))

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
        { field: 'email', headername: 'email', width: 130 },
        { field: 'mobile_no', headername: 'mobile_no', width: 130 },
        { field: 'subject', headername: 'subject', width: 130 },
        { field: 'message', headername: 'message', width: 130 },
        { field: 'remark', headername: 'remark', width: 300 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (parms) => (
                <>
                    <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
                        <EditIcon />
                    </IconButton>

                </>
            ),
        },



    ];


    const paginationModel = { page: 0, pageSize: 5 };

    console.log(formik.errors, formik.touched);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Contact</h1>
            </Box>


            <React.Fragment>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Remark</DialogTitle>
                    <DialogContent>

                        <form onSubmit={formik.handleSubmit} id="subscription-form">


                            <TextField
                                error={formik.errors.remark && formik.touched.remark}


                                margin="dense"
                                id="remark"
                                name="remark"
                                label="remark"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                rows={5}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remark}
                                helperText={formik.errors.remark && formik.touched.remark ? formik.errors.remark : ''}

                            />













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
                rows={contectdata.contect}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />

        </div>
    );
}

export default Contact;