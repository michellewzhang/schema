import React from 'react';
import styles from './DragDrop.css';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
    console.log(e.target.value);
  }

  render() {
    const schemaTitle = this.props.title;

    return (
      <div className="container">
        <div className="title">
          <form>
            <input
              type="text"
              className="title-input"
              placeholder="Title Your Schema"
              value={schemaTitle} onChange={this.handleChange} />
            <IconButton aria-label="save">
              <SaveAltIcon />
            </IconButton>
          </form>
        </div>

        <div className="dialog-area"></div>

        <div className="component-container">
          <h3>Components</h3>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <Paper children="State" elevation={3} className="large-paper" style={{backgroundColor: '#EDFEEA'}}/>
            </Grid>
            <Grid item md={2}>
              <Paper children="Action" elevation={3} className="large-paper" style={{backgroundColor: '#FFF7D8'}}/>
            </Grid>
            <Grid item md={2}>
              <Paper children="Query" elevation={3} className="large-paper" style={{backgroundColor: '#EAEEFE'}}/>
            </Grid>
          </Grid>
        </div>

      </div>
    )
  }
};
