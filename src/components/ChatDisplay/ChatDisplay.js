import * as React from 'react';
import Messenger from '../Messenger';
import SplitPane from 'react-split-pane';
import './ChatDisplay.module.css';

export default function ChatDisplay(props) {


  return (
    <SplitPane split="vertical" defaultSize={200} primary="second">
      <div>Left side</div>
      <div>Right side</div>
    </SplitPane>
  );
}
