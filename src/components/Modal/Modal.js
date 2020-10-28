import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './Modal.css';

export default function Modal(props) {
  const [open, setOpen] = React.useState(false);

  if (props.open){
    setOpen(true);
  }

  /*const handleClickOpen = () => {
    setOpen(true);
  };*/

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><span className="dialog-title">Edit Data</span></DialogTitle>
        <DialogContent>
           <h4 className="input-title">Title:</h4>
          <TextField
            autoFocus
            id="name"
            label="Enter title"
            fullWidth={true}
            multiline={true}
            value={props.node.data.label}
            className="input-field"
            variant="outlined"
            />
           <h4 className="input-title">Text:</h4> 
          <TextField
            autoFocus
            id="name"
            label="Enter text"
            fullWidth={true}
            multiline={true}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}