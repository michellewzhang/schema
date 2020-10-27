import React from 'react';
import styles from './DragDrop.css';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Flow from '../Flow/Flow';

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

        <div className="component-container">
          <div style={{ height: 600, width: 600 }}>
            <Flow />
          </div>
        </div>

      </div>
    )
  }
};
