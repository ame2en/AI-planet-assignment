import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactFlow, Controls, Background, addEdge, ConnectionMode, ConnectionLineType } from '@xyflow/react';
import { setNodes, updateNodes, setEdges, updateEdges } from '../redux/store.js';
import '@xyflow/react/dist/style.css';

// Define your custom nodes and other configurations here.

const LLMWorkflow = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes);
  const edges = useSelector((state) => state.edges);

  const [nodeData, setNodeData] = useState({
    input: { input: '' },
    llm: { model: 'gpt-3.5', apiBase: '', apiKey: '', temperature: 0.5, maxTokens: 2048 },
    output: { output: '' },
  });


  

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(params, edges);
      dispatch(setEdges(newEdges));
    },
    [dispatch, edges]
  );

  const onNodesChange = useCallback(
    (newNodes) => dispatch(updateNodes(newNodes)),
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (newEdges) => dispatch(updateEdges(newEdges)),
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = { x: event.clientX, y: event.clientY };
      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: {
          ...nodeData[type],
          onChange: (field, value) => {
            setNodeData((prev) => ({
              ...prev,
              [type]: { ...prev[type], [field]: value },
            }));
          },
        },
      };
      dispatch(setNodes([...nodes, newNode]));
    },
    [dispatch, nodeData, nodes]
  );

  return (
    <div className="h-screen w-full">
      <div className="flex w-[100vw] h-[100vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          connectionMode={ConnectionMode.Loose}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default LLMWorkflow;
