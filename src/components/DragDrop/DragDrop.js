import React from 'react';
import styles from './DragDrop.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Flow from '../Flow/Flow';
import Modal from '../Modal/Modal';
import Tooltip from '@material-ui/core/Tooltip';

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      count: 1,
      elementsList: [],
      open: false,
      selected: {
        id: 'None',
        position: { x: 0, y: 0 },
        data: {
          label: 'None',
          text: 'None'
        }
      }
    };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  onListRemove = (arr) => {
    var newArr = this.state.elementsList;
    arr.forEach(item => {
      var targetId = item.id;
      newArr = newArr.filter(function (obj) {
        return obj.id !== targetId;
      });
    })
    this.setState({ elementsList: newArr })
  }

  onEdgeAdded = (edge) => {
    var source = edge.source;
    var target = edge.target;

    var newEdge = {
      id: ('e'.concat(source)).concat(target),
      type: 'default',
      source: source,
      target: target
    }

    this.setState(prevState => ({
      elementsList: [...prevState.elementsList, newEdge],
    }));
  }

  onNodeSelected = (node) => {
    this.setState({ selected: node, open: true });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

  render() {
    const schemaTitle = this.props.title;
    console.log(this.state.elementsList);

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
            <span className="howto">
            <Tooltip title="DELETE: select + backspace; EDIT: right click"
            leaveDelay={400} arrow>
              <Button variant="contained" color="secondary" disableElevation>How to</Button>
            </Tooltip>
            </span>
          </form>
        </div>
        <div className="component-container">
          <div style={{ height: 450, width: 1200 }}>
            <Flow el={this.state.elementsList}
              onRemove={this.onListRemove}
              onEdge={this.onEdgeAdded}
              onSelect={this.onNodeSelected} />
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
                  data: { label: 'New State', text: 'Default Text' },
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
                  data: { label: 'New Action', text: 'Default Text' },
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
                  data: { label: 'New Query', text: 'Default Text' },
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

          <Modal closeModal={this.closeModal} open={this.state.open} node={this.state.selected} />
        </div>
      </div>
    )
  }
};
