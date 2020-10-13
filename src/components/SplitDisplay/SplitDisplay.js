import * as React from 'react';
import Messenger from '../Messenger';
import SplitPane from 'react-split-pane';
import './SplitDisplay.css';

export default function SplitDisplay(props) {
  return (
    <SplitPane split="vertical">
      <div>Left side</div>
      <div><Messenger /></div>
    </SplitPane>
  );
}
