import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { date, mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getcontect } from '../../../redux/slice/contect.slice';

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

    const contactdata = useSelector(state => state.contact);
    console.log(contactdata);

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
        name: string().required('please enter name'),
        email: string().required('please enter email'),
        subject: string().required('please enter subject'),
        message: string().required('please enter message'),




    });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',






        },
        validationSchema: contactschema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);



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
    { field: 'subject', headername: 'subject', width: 130 },
        { field: 'message', headername: 'message', width: 130 },



  ];


  const paginationModel = { page: 0, pageSize: 5 };

  console.log(formik.errors, formik.touched);

    return (
        <div>

        </div>
    );
}

export default Contact;