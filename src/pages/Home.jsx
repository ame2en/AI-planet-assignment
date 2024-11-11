import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Background,ReactFlow,Controls,useReactFlow,ReactFlowProvider,Panel} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "../components/Sidebar.jsx";
import {
  InputNode,
  OutputNode,
  LLMNode,
  nodeTypes,
} from "../components/Nodes.jsx";
import Navbar from "../components/Navbar";
import { useWorkflow } from "../context/WorkflowContext.jsx";

let id = 0;
const getId = () => `dndnode_${id++}`;

const Home = () => {
  return (
    <ReactFlowProvider>
      <Llmscreen />
    </ReactFlowProvider>
  );
};

const Llmscreen = () => {
  const [type, setType] = useState(null);
  const reactFlowWrapper = useRef(null);

  const {nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect} = useWorkflow();
  const [nodeData, setNodeData] = useState({});
  

  const { screenToFlowPosition } = useReactFlow();

  const updateNodeData = (id, param, value) => {
    setNodeData((prevData) => ({
      ...prevData,
      
        [param]: value,
      
    }));

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [param]: value,
            },
          };
        }
        return node;
      })
    );
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = getId();
      var newNode;
      if(type==='inputnode'){
      newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type}`,
          input:'',
          onChange: (param, value) => updateNodeData(nodeId, param, value), // Pass the update function
        },
      };}
      else if(type==='llmnode'){
      newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type}`,
          model: "",
          apiBase: "",
          apiKey: "",
          maxTokens: "",
          temperature: "",
          onChange: (param, value) => updateNodeData(nodeId, param, value), // Pass the update function
        },
      };}
      else{
      newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type}`,
          output : "",
          onChange: (param, value) => updateNodeData(nodeId, param, value), // Pass the update function
        },
      };}

      setNodes((nds) => nds.concat(newNode));
      setType(null); // Reset node type after drop
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const isValidConnection = (connection) => {
    const { source, target } = connection;
    
    // Get the types of source and target nodes
    const sourceNode = nodes.find(node => node.id === source);
    const targetNode = nodes.find(node => node.id === target);
  
    if (!sourceNode || !targetNode) return false; // In case nodes are missing, fail validation
  
    // Validation rules
    if (sourceNode.type === 'inputnode' && targetNode.type === 'llmnode') return true;
    if (sourceNode.type === 'llmnode' && targetNode.type === 'outputnode') return true;
  
    // For any other combination, return false
    return false;
  };

  return (
    <div className=" w-[100vw] h-[93vh] " ref={reactFlowWrapper}>
      <Navbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnection}
      >
        <div className=" h-full relative">
          <Panel position="" className="flex items-center h-[100%]">
            <Sidebar onDragStart={onDragStart} />
          </Panel>
        </div>
        <Controls position="bottom-left" style={{ left: 300 }} />
        <Background variant="dots" gap={12} size={2} color="rgba(0,0,0,0.2)" />
      </ReactFlow>
    </div>
  );
};




export default Home;