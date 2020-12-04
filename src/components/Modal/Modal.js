/* Copyright Carnegie Mellon University 2020 Michelle Zhang. */

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './Modal.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.node.data.label,
      text: this.props.node.data.text,
      titleChanged: false,
      textChanged: false
    }
  }

  handleClose = () => {
    this.props.closeModal();
  };

  handleSubmit = () => {
    var newtitle = this.props.node.data.label;
    var newtext = this.props.node.data.text;

    if (this.state.titleChanged) {
      newtitle = this.state.title;
    }

    if (this.state.textChanged) {
      newtext = this.state.text;
    }

    this.props.onDataChange(newtitle, newtext, this.props.node);
    this.setState({titleChanged: false, textChanged: false});
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"><span className="dialog-title">Edit Data</span></DialogTitle>
          <DialogContent>
            <h4 className="input-title">Title:</h4>
            <TextField
              autoFocus
              id="title"
              label="Enter title"
              fullWidth={true}
              multiline={true}
              defaultValue={this.props.node.data.label}
              onChange={(event) => {
                this.setState({ title: event.target.value, titleChanged: true });}}
              variant="outlined"
            />
            <h4 className="input-title">Text:</h4>
            <TextField
              autoFocus
              id="text"
              label="Enter text"
              fullWidth={true}
              multiline={true}
              defaultValue={this.props.node.data.text}
              onChange={(event) => {
                this.setState({ text: event.target.value, textChanged: true });}}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } 
}