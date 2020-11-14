import * as React from 'react';
import Messenger from '../Messenger';
import SplitPane from 'react-split-pane';
import DragDrop from '../DragDrop/DragDrop';
import './SplitDisplay.css';


export default class SplitDisplay extends React.Component {
  constructor(props) {
    const MY_USER_ID = Math.random().toString(36).substr(2, 9);

    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { 
      title: 'Title Your Schema',
      userID: MY_USER_ID
    };
  }

  onChange(t) {
    this.setState({ title: t });
  }

  render() {
    return (
      <div className="split">
        <SplitPane allowResize={true} split="vertical">
          <div className="dnd"><DragDrop onChange={this.onChange} title={this.state.title} userID={this.state.userID} /></div>
          <div><Messenger title={this.state.title} userID={this.state.userID}/></div>
        </SplitPane>
      </div>
    );
  }
}
