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
      count: 4,
      elementList: [
        {
          id: '1',
          type: 'input',
          data: {
            label: (
              <>
                Welcome to the <strong>Dialog Builder</strong>
              </>
            ),
          },
          position: { x: 250, y: 0 },
        },
        {
          id: '2',
          data: {
            label: 'drag me',
          },
          position: { x: 400, y: 350 },
        },
        {
          id: '3',
          type: 'output',
          data: { label: 'try drawing a connection here' },
          position: { x: 120, y: 350 },
        },
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          label: 'to delete a node / edge: click and press delete key',
          type: 'smoothstep',
        }]
    };
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
          <div style={{ height: 450, width: 600 }}>
            <Flow el={this.state.elementList} />
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
                  elementList: [...prevState.elementList, newEl],
                  count: prevState.count + 1
                }));
                console.log(this.state.elementList);
                console.log(this.state.count);
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
                  position: { x: 60, y: 50 },
                  style: {
                    border: '1px solid #ff0a80',
                  }
                };

                this.setState(prevState => ({
                  elementList: [...prevState.elementList, newEl],
                  count: prevState.count + 1
                }));
                console.log(this.state.elementList);
                console.log(this.state.count);
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
                  position: { x: 60, y: 70 },
                  style: {
                    border: '1px solid #222222',
                  }
                };

                this.setState(prevState => ({
                  elementList: [...prevState.elementList, newEl],
                  count: prevState.count + 1
                }));
                console.log(this.state.elementList);
                console.log(this.state.count);
              }}>
              Query
          </Button>
          </span>

        </div>
      </div>
    )
  }
};
