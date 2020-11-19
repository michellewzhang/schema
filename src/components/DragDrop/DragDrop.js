import React from 'react';
import styles from './DragDrop.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Tooltip from '@material-ui/core/Tooltip';
import Flow from '../Flow/Flow';
import Modal from '../Modal/Modal';
import Toast from '../Toast/Toast';
import { isNode, getIncomers, getOutgoers } from 'react-flow-renderer';

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      userID: this.props.userID,
      count: 1,
      elementsList: [],
      modalOpen: false,
      errorList: new Set(),
      toastActive: false,
      selected: {
        id: 'None',
        position: { x: 0, y: 0 },
        data: {
          label: '',
          text: '',
          type: 'State'
        }
      }
    };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleSave = (e) => {
    //data representation
    const elements = [...this.state.elementsList];
    const states = {};
    elements.forEach(obj => {
      if (isNode(obj)) {
        states[obj.data.label] = obj.data.text
      }
    });

    const connections = {};
    var startMessage = "";

    elements.forEach(obj => {
      if (isNode(obj)) {
        var incoming = getIncomers(obj, elements);
        if (obj.data.type !== "State") {
          incoming.forEach(node => connections[node.data.label] = obj.data.label);
        }
        if (incoming.length === 0) {
          startMessage = obj.data.label;
        }
      }
    });

    const data = {
      task: this.props.title,
      replies: states,
      graph: connections,
      start: startMessage,
      userID: this.state.userID
    }
    //end data representation

    var errors = new Set();
    elements.forEach(obj => {
      if (isNode(obj)) {
        var incoming = getIncomers(obj, elements);
        var outgoing = getOutgoers(obj, elements);
        if (incoming.length === 0 && outgoing.length === 0) {
          errors.add("a node is disconnected");
        }

        var outLen = outgoing.length;
        if (outLen > 1) {
          const stateN = outgoing.filter(n => n.data.type === 'State');
          if (stateN.length === outLen) {
            errors.add("non-determinism")
          }
        }
      }
    });

    console.log(errors);
    console.log(data);
    this.setState({ toastActive: true, errorList: errors })

    if (errors.size === 0) {
      var request = new XMLHttpRequest();
      request.open('POST', 'http://shikib.sp.cs.cmu.edu:8899/', true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.send(JSON.stringify(data));
    }
  }

  onDataChange = (valTitle, valText, node) => {
    var newNode = JSON.parse(JSON.stringify(node));
    var nodeId = node.id
    newNode.data.label = valTitle;
    newNode.data.text = valText;

    this.setState({
      elementsList: this.state.elementsList.filter(function (obj) {
        return obj.id !== nodeId
      }).concat(newNode)
    });

  }

  onListRemove = (arr) => {
    var newArr = [...this.state.elementsList];
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
    this.setState({ selected: node, modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  closeToast = () => {
    this.setState({ toastActive: false });
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
            <IconButton aria-label="save" onClick={this.handleSave}>
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
                  data: { label: 'New State', text: 'Default Text', type: 'State' },
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
                  data: { label: 'New Action', text: 'Default Text', type: 'Action' },
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
                  data: { label: 'New Query', text: 'Default Text', type: 'Query' },
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

          <Modal closeModal={this.closeModal} open={this.state.modalOpen} node={this.state.selected}
            onDataChange={this.onDataChange} />

          <Toast closeToast={this.closeToast} open={this.state.toastActive} errors={this.state.errorList} />

        </div>
      </div>
    )
  }
};
