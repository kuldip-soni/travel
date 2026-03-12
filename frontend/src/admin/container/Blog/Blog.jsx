import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

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
    return (
        <div>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1>Blog</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Blog
                </Button>
            </Box>

            <React.Fragment>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Blog</DialogTitle>
        <DialogContent>
          
          <form onSubmit={handleSubmit} id="subscription-form">
            

            <TextField
              autoFocus
              required
              margin="dense"
              id="Title"
              name="Title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="Date"
              name="Date"
              label="Date"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="Description"
              name="Description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
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
            
        </div>
    );
}

export default Blog;