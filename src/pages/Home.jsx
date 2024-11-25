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
  const [error, setError] = useState("ameen is backk"); 
  const reactFlowWrapper = useRef(null);

  const {nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect} = useWorkflow();
  // const [nodeData, setNodeData] = useState({});
  

  const { screenToFlowPosition } = useReactFlow();

  const updateNodeData = (id, param, value) => {
    // setNodeData((prevData) => ({
    //   ...prevData,
      
    //     [param]: value,
      
    // }));

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
  
  const handleRunClick = () => {
    // Pass nodes and edges to the API function
    callOpenAiApi({ nodes, edges, setNodes });
  };

  const callOpenAiApi = async ({nodes,edges,setNodes}) => {

    const inputNode = nodes.find((node) => node.type === 'inputnode');
    const llmNode = nodes.find((node) => node.type === 'llmnode');
    const outputNode = nodes.find((node) => node.type === 'outputnode');


  
    if (!inputNode || !llmNode || !outputNode) {
      console.error("Workflow is missing required nodes.");
      return;
    }

    const inputToLlm = edges.some(
      (edge) => edge.source === inputNode.id && edge.target === llmNode.id
    );
    const llmToOutput = edges.some(
      (edge) => edge.source === llmNode.id && edge.target === outputNode.id
    );
  
    if (!inputToLlm || !llmToOutput) {
      console.error("Workflow nodes are not correctly connected.");
      return ;
    }



    
  
    const input = inputNode.data.input;
    const apiKey = llmNode.data.apiKey;
    const model = llmNode.data.model ; 
    const temperature = llmNode.data.temperature ;
    const maxTokens = llmNode.data.maxTokens ;
    const url = llmNode.data.apiBase;
  
    if (!apiKey) {
      console.error("API Key is missing in the LLM Node.");
      return;
    }
  

  
    try {
      const response = await axios.post(
        url,
        {
          model : model,
          prompt: input,
          temperature : temperature,
          max_tokens: maxTokens,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const result = response.data.choices[0].text;
  
      
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === outputNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                output: result, 
              },
            };
          }
          return node;
        })
      );
  
      console.log("OpenAI API Response:", result);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
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
          onChange: (param, value) => updateNodeData(nodeId, param, value), 
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
          onChange: (param, value) => updateNodeData(nodeId, param, value), 
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
          onChange: (param, value) => updateNodeData(nodeId, param, value), 
        },
      };}

      setNodes((nds) => nds.concat(newNode));
      setType(null); 
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const isValidConnection = (connection) => {
    const { source, target } = connection;
    
    const sourceNode = nodes.find(node => node.id === source);
    const targetNode = nodes.find(node => node.id === target);
  
    if (!sourceNode || !targetNode) return false; 
  
    if (sourceNode.type === 'inputnode' && targetNode.type === 'llmnode') return true;
    if (sourceNode.type === 'llmnode' && targetNode.type === 'outputnode') return true;
  
    return false;
  };



  return (
    <div className=" w-[100vw] h-[93vh] " ref={reactFlowWrapper}>
      <Navbar  callOpenAiApi={handleRunClick}/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnection}
        >
        {error && <div className=" relative">
          
          <Panel position="top-right" >ameen
            <div className=""></div>
            </Panel></div>}


        
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


