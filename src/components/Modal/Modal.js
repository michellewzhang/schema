import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './Modal.css';

export default function Modal(props) {
  const [title, setTitle] = useState(props.node.data.label);
  const [text, setText] = useState(props.node.data.text);

  const handleClose = () => {
    props.closeModal();
  };

  const handleSubmit = () => {
    props.onDataChange(title, text, props.node)
    props.closeModal();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><span className="dialog-title">Edit Data</span></DialogTitle>
        <DialogContent>
          <h4 className="input-title">Title:</h4>
          <TextField
            autoFocus
            id="title"
            label="Enter title"
            fullWidth={true}
            multiline={true}
            defaultValue={props.node.data.label}
            onChange={(event) => { setTitle(event.target.value) }}
            variant="outlined"
          />
          <h4 className="input-title">Text:</h4>
          <TextField
            autoFocus
            id="text"
            label="Enter text"
            fullWidth={true}
            multiline={true}
            defaultValue={props.node.data.text}
            onChange={(event) => { setText(event.target.value) }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}