import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Toast(props) {
  var success = false;
  var error = false;
  if (props.errors.size === 0) {
    success = true;
  }
  else {
    error = true;
  }

  const handleClose = () => {
    props.closeToast();
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Snackbar open={props.open && success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Schema saved successfully!
          </Alert>
      </Snackbar>
      <Snackbar open={props.open && error} autoHideDuration={100000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error(s): {Array.from(props.errors).join('; ')}
        </Alert>
      </Snackbar>
    </div>
  );
}
