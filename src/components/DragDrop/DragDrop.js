import React from 'react';
import styles from './DragDrop.css';

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
      <div>
        <div className="title">
          <form>
            <input
              type="text"
              className="title-input"
              placeholder="Title Your Schema"
              value={schemaTitle} onChange={this.handleChange} />
          </form>
        </div>
        <div className="dialog-area"></div>
        <div className="components">
            Components
        </div>
      </div>
    )
  }
};
