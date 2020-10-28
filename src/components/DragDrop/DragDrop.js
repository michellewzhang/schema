import React from 'react';
import styles from './DragDrop.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Flow from '../Flow/Flow';

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      count: 1,
      elementsList: []
    };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
    console.log(e.target.value);
  }

  onListChange = (arr) => {
    var targetId = arr[0].id;
    var newArr = this.state.elementsList.filter(function(obj) {
      return obj.id !== targetId;
    });
    this.setState({elementsList: newArr })
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
          <div style={{ height: 450, width: 600 }}>
            <Flow el={this.state.elementsList} onChange={this.onListChange} />
          </div>
        </div>

        <div>
          <h3>Add a Component</h3>
          <span className="add-button">
            <Button variant="outlined" color="primary"
              onClick={() => {
                const newEl = {
                  id: this.state.count.toString(),
                  type: 'default',
                  data: { label: 'New State' },
                  position: { x: 60, y: 50 },
                  style: {
                    border: '1px solid #454bff',
                  }
                };

                this.setState(prevState => ({
                  elementsList: [...prevState.elementsList, newEl],
                  count: prevState.count + 1
                }));
              }}>
              State
          </Button>
          </span>

          <span className="add-button">
            <Button variant="outlined" color="secondary"
              onClick={() => {
                const newEl = {
                  id: this.state.count.toString(),
                  type: 'default',
                  data: { label: 'New Action' },
                  position: { x: 160, y: 50 },
                  style: {
                    border: '1px solid #ff0a80',
                  }
                };

                this.setState(prevState => ({
                  elementsList: [...prevState.elementsList, newEl],
                  count: prevState.count + 1
                }));
              }}>
              Action
          </Button>
          </span>

          <span className="add-button">
            <Button variant="outlined" color="default"
              onClick={() => {
                const newEl = {
                  id: this.state.count.toString(),
                  type: 'default',
                  data: { label: 'New Query' },
                  position: { x: 260, y: 50 },
                  style: {
                    border: '1px solid #222222',
                  }
                };

                this.setState(prevState => ({
                  elementsList: [...prevState.elementsList, newEl],
                  count: prevState.count + 1
                }));
              }}>
              Query
          </Button>
          </span>

        </div>
      </div>
    )
  }
};
