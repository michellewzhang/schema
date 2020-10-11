import * as React from 'react';
import Splitscreen from 'react-draggable-splitscreen';

export default function ChatDisplay(props) {
  const MyLeftSide = () => <div>Hello</div>;
  const MyRightSide = () => <div>Hello</div>;
  const MyElement = () => <Splitscreen leftSide={<MyLeftSide />} rightSide={<MyRightSide />} />

  return (
    <MyElement />
  );
}
