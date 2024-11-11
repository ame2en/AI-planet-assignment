// import React, { createContext, useState, useContext } from 'react';

// const WorkflowContext = createContext();

// export const WorkflowProvider = ({ children }) => {
//   const [nodes, setNodes] = useState([]);
//   const [connections, setConnections] = useState([]); 

//   const addNode = (node) => setNodes((prevNodes) => [...prevNodes, node]);

//   const updateNodeData = (id, key, value) => {
//     setNodes((prevNodes) =>
//       prevNodes.map((node) =>
//         node.id === id ? { ...node, data: { ...node.data, [key]: value } } : node
//       )
//     );
//   };

//   const addConnection = (connection) => setConnections((prevConnections) => [...prevConnections, connection]);

//   return (
//     <WorkflowContext.Provider
//       value={{
//         nodes,
//         connections,
//         addNode,
//         updateNodeData,
//         addConnection,
//       }}
//     >
//       {children}
//     </WorkflowContext.Provider>
//   );
// };

// export const useWorkflow = () => {
//   return useContext(WorkflowContext); // Added return statement here
// };


import React, { createContext, useContext } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params) => setEdges((eds) => addEdge({ ...params, type: 'straight', animated: true }, eds));

  return (
    <WorkflowContext.Provider value={{ nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);