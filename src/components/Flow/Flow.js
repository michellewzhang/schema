import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const Flow = () => {

  const elementsList = [
    {
      id: '1',
      type: 'input',
      data: {
        label: (
          <>
            Welcome to the <strong>Dialog Builder</strong>
          </>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: 'drag me',
      },
      position: { x: 250, y: 130 },
    },

    {
      id: '3',
      type: 'output',
      data: { label: 'try drawing a connection here' },
      position: { x: 120, y: 200 },
    },
    {
      id: 'state',
      type: 'default',
      data: { label: 'New State' },
      position: { x: 15, y: 400 },
      style: {
        border: '1px solid #454bff',
      }
    },
    {
      id: 'action',
      type: 'default',
      data: { label: 'New Action' },
      position: { x: 215, y: 400 },
      style: {
        border: '1px solid #fc1e89',
      },
    },
    {
      id: 'query',
      type: 'default',
      data: { label: 'New Query' },
      position: { x: 415, y: 400 },
    },

    {
      id: 'e1-2',
      source: '1',
      target: '2',
      label: 'to delete a node / edge: click and press delete key',
      type: 'smoothstep',
    },

  ];

  const [elements, setElements] = useState(elementsList);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onNodeDragStart = (e, node) => {
    if (node.position.x == 15 && node.position.y == 400) {
      var newElements = elements.slice();
      
      newElements.push({
        id: node.id.concat('copy'),
        type: 'default',
        data: { label: 'New State' },
        position: { x: 15, y: 400 },
        style: {
          border: '1px solid #454bff',
        }
      });
      setElements(newElements);
    }

    if (node.position.x == 215 && node.position.y == 400) {
      var newElements = elements.slice();
      
      newElements.push({
        id: node.id.concat('copy'),
        type: 'default',
        data: { label: 'New Action' },
        position: { x: 215, y: 400 },
        style: {
          border: '1px solid #fc1e89',
        }
      });
      setElements(newElements);
    }

    if (node.position.x == 415 && node.position.y == 400) {
      var newElements = elements.slice();
      
      newElements.push({
        id: node.id.concat('copy'),
        type: 'default',
        data: { label: 'New Query' },
        position: { x: 415, y: 400 },
      });
      setElements(newElements);
    }
  }

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onNodeDragStart={onNodeDragStart}
      onConnect={onConnect}
      onLoad={onLoad}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
export default Flow;