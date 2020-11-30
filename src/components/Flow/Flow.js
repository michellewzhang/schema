/* Copyright Carnegie Mellon University 2020 Michelle Zhang. */

import React, { useState, useEffect } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const Flow = (props) => {
  const elementsList = props.el;
  const [elements, setElements] = useState(elementsList);

  useEffect(() => {
    setElements(props.el);
  }, [props.el]);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) =>
      removeElements(elementsToRemove, els));

    props.onRemove(elementsToRemove);
  }

  const onConnect = (params) => {
    setElements((els) =>
      addEdge(params, els));

    props.onEdge(params);
  }

  const onNodeContextMenu = (e, n) => {
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
    props.onSelect(n);
  }

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      variant="dots"
      onNodeContextMenu={onNodeContextMenu}
    >
      <Background
        variant="dots"
        gap={16}
      />
      <Controls />
    </ReactFlow>
  );
}
export default Flow;