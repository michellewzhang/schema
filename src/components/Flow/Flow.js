import React, { useState, useEffect } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
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

  const onElementsRemove = (elementsToRemove) => 
  {
    setElements((els) =>
      removeElements(elementsToRemove, els));

    console.log(elementsToRemove);
    props.onChange(elementsToRemove);
  }
      
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
    >
      <Controls />
    </ReactFlow>
  );
}
export default Flow;