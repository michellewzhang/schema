import * as React from 'react';
import Splitscreen from 'react-draggable-splitscreen';
import Messenger from '../Messenger';

export default function ChatDisplay(props) {
  const LeftSide = () => <div>Dialog builder will go here</div>;
  const RightSide = () => <Messenger />;
  const Display = () => <Splitscreen leftSide={<LeftSide />} rightSide={<RightSide />} />

  return (
    <Display />
  );
}
