import * as React from 'react';
import Messenger from '../Messenger';
import SplitPane from 'react-split-pane';
import DragDrop from '../DragDrop/DragDrop';
import './SplitDisplay.css';


export default class SplitDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { title: 'Title Your Schema' };
  }

  onChange(t) {
    this.setState({ title: t });
    console.log(t);
  }

  render() {
    return (
      <div>
      <SplitPane split="vertical" minSize={500}>
        <div><DragDrop onChange={this.onChange} title={this.state.title} /></div>
        <div><Messenger title={this.state.title} /></div>
      </SplitPane>
      </div>
    );
  }
}
