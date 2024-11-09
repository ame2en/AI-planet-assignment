import React, { useCallback, useMemo, useState } from 'react';

import { addEdge, Background, ReactFlow, useEdgesState, useNodesState,Panel, ControlButton, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import inputicon from "../assets/inputicon.svg"
import llmicon from "../assets/llmicon.svg"
import outputicon from "../assets/outputicon.svg"
import Vector from "../assets/Vector.svg";
import { InputNode,OutputNode,LLMNode,nodeTypes,TextUpdaterNode } from '../components/Nodes.jsx';

import Navbar from '../components/Navbar';






// const initialEdges = [
//   // { id: 'e1-2', source: '1', target: '2' },
//   // { id: 'e2-3', source: '2', target: '3', animated: true },
// ];

   

const Home = () => {

  
  
  const [data,setData] = useState({
    input : "",
  })
  
  const onchange = (param, value) => {
    setData((prev) => ({
      ...prev,
      [param]: value,  // Use dynamic key to set the property
    }));
  };


  const initialNodes = [
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { value: 123 },
    },
    {
      id: 'node-2',
      type:'inputnode',
      position : {
        x:0, y:100
      },
      data : {
        input : data.input,
        onChange: onchange,
      }
    },
    {
      id: 'node-3',
      type:'llmnode',
      position : {
        x:50, y:200
      },
      data : {
        input : data.input,
        onChange: onchange,
      }
    }
  ];


  const [nodes,setNodes,onNodesChange] = useNodesState(initialNodes);
  const [edges,setEdges,onEdgesChange] = useEdgesState([]);


  

 


  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'straight', animated: true }, eds)
      ),
    [setEdges]
  );

  const nodetypes = useMemo(() => ({ textUpdater: TextUpdaterNode,inputnode : InputNode,llmnode : LLMNode }), []);


  return (
    <div className=' w-[100vw] h-[93vh] ' >
        <Navbar />
        <ReactFlow nodes={nodes} edges={edges}  style={{backgroundColor : 'rgba(0,0,0,0.1)'}}
        // nodeTypes={nodeTypes}
        nodeTypes={nodetypes}
         onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
          <div className=' h-full relative'>

          <Panel position="" className="flex items-center h-[100%]">
          <div className=' bg-white w-[250px] h-[93%] ml-4 rounded-[20px] flex flex-col border-[1px] border-[#E4E8EE] -mt-6 py-5 px-6'>
            <span className=' text-[18px] font-semibold'>
            Components
            </span>
            <span className=' w-full h-[1px] my-4 bg-[rgba(0,0,0,0.2)]'></span>
            <span className=' text-[rgba(68,68,68,0.5)] text-sm'>Drag and Drop</span>
            <div className='flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px]  border-[rgba(148,163,184,1)]'>
              <div className=' flex justify-start gap-2 items-center'>
              <img src={inputicon}/>
              <span className=' text-[12px] font-[400]'>Input</span>
              </div>
              <img src={Vector} />
            </div>
            <div className='flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px] border-[rgba(148,163,184,1)]'>
              <div className=' flex justify-start gap-2 items-center'>
              <img src={llmicon}/>
              <span className=' text-[12px] font-[400]'>LLM Engine</span>
              </div>
              <img src={Vector} />
            </div>
            <div className='flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px] border-[rgba(148,163,184,1)]'>
              <div className=' flex justify-start gap-2 items-center'>
              <img src={outputicon}/>
              <span className=' text-[12px] font-[400]'>Output</span>
              </div>
              <img src={Vector} />
            </div>
          </div>
        </Panel>
          </div>
            <Controls position='bottom-left' style={{left : 300}}/>
          <Background variant="dots" gap={12} size={2}  color='rgba(0,0,0,0.2)' />
        </ReactFlow >
        

    </div>
  )
}




export default Home;

