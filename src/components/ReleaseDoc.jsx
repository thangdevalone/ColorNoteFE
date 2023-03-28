import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ReleaseDoc() {
  const [open, setOpen] = React.useState(true);
  const handleNotShow=()=>{
    localStorage.setItem('show',false)
    setOpen(false);
  }


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Welcome to the first version of Cloud Note
        </DialogTitle>
        <DialogContent sx={{padding:"20px 35px",color:"#7e7e7e"
    }}>
                <div><b>Feature:</b></div>
                <ul style={{paddingLeft:"30px"}}>
                    <li>CRUD note</li>
                    <li>Choose color</li>
                    <li>Restore note</li>
                    <li>Settings</li>
                </ul>
                <div><b>Upcoming:</b></div>
                <ul style={{paddingLeft:"30px"}}>
                    <li>Calendar</li>
                    <li>Sort & find note</li>
                    <li>More than more</li>
                </ul>
                <b>Happy a good day! Try to my app thank you</b>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Oke</Button>
          <Button onClick={handleNotShow}>
            Don't show again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}