import React, { useState, useCallback } from 'react';
import inputicon from "../assets/inputicon.svg"
import llmicon from "../assets/llmicon.svg"
import downarrow from "../assets/downarrow.svg"
import '@xyflow/react/dist/style.css';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };
 
function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="input-field"  placeholder='type here'/>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}




 
// const handleStyle = { left: 10 };
 
// function TextUpdaterNode({ data }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);
 
//   return (
//     <>
//       <Handle type="target" position={Position.Top} />
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input id="text" name="text" onChange={onChange} className="nodrag" />
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="b"
//         style={handleStyle}
//       />
//     </>
//   );
// }


// Custom Node Components
const InputNode = ({ data }) => {
  return (
    <>
    <div className="bg-white rounded-[12px] shadow-md pb-[100px] w-[325px]">
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-2">
          <img  src={inputicon} />
          <span className=" font-semibold">INPUT</span>
        </div>
        <button className=" w-[12px] h-[12px] bg-[#383838] rounded-full"></button>
      </div>
      
        <p className="text-sm bg-[rgba(238,244,255,1)] text-[rgba(102,102,102,1)] p-3">Write the input/ question you want to ask</p>
        <div className=' mt-5 mx-5'>
          <span className=' text-sm '>Input</span>
          <input
            type="text"
            placeholder="Type Something..."
            className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm "
            // value={data.input}
            // onChange={(e) => data.onChange('input', e.target.value)}
          />
        </div>
      </div>
      
    
      <Handle
  type="source"
  position={Position.Right}
  id="b"
  style={{
    top: 280,
    width: '10px', 
    height: '10px', 
    borderRadius: '50%', 
    border: '1px solid black', 
    backgroundColor: 'white', 
  }}
/>
        
        
    </>
  );
};

const LLMNode = ({ data }) => {
  return (
    <div className="bg-white rounded-[12px] shadow-md pb-[100px] w-[325px]">
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-2">
        <img  src={llmicon} />
          <span className=" font-semibold">LLM ENGINE</span>
        </div>
        <button className="w-[12px] h-[12px] bg-[#383838] rounded-full"></button>
      </div>
      <p className="text-sm bg-[rgba(238,244,255,1)] text-[rgba(102,102,102,1)] p-3">Lorem ipsum sic dolar amet </p>
        <div>
          <label className="block text-sm font-medium text-gray-700">Model Name</label>
          <div className="relative">
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none"
              value={data.model}
              onChange={(e) => data.onChange('model', e.target.value)}
            >
              <option value="gpt-3.5">gpt-3.5</option>
              <option value="gpt-4">gpt-4</option>
            </select>
            {/* <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500" /> */}
            {/* <img  src={downarrow} className="absolute right-2 top-3 " /> */}

          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OpenAI API Base</label>
          <input
            type="text"
            placeholder="type something"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.apiBase}
            onChange={(e) => data.onChange('apiBase', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OpenAI Key</label>
          <input
            type="password"
            placeholder="type something"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.apiKey}
            onChange={(e) => data.onChange('apiKey', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
          <input
            type="number"
            placeholder="type something"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.maxTokens}
            onChange={(e) => data.onChange('maxTokens', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.temperature}
            onChange={(e) => data.onChange('temperature', e.target.value)}
          />
        </div>
      <Handle
  type="target"
  position={Position.Left}
  id="d"
  style={{
      top: 300,width: '10px',height: '10px',borderRadius: '50%',border: '1px solid black',backgroundColor: 'white',}}/>
      
      <Handle
  type="source"
  position={Position.Right}
  id="c"
  style={{
    top: 330,width: '10px',height: '10px',borderRadius: '50%',border: '1px solid black',backgroundColor: 'white',}}/>
    </div>
  );
};

const OutputNode = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">OUTPUT</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">•</button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Output Response</label>
          <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-3 min-h-[100px]">
            {data.output || 'Output Response will be shown here'}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-start">
        <div className="h-3 w-3 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
};

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};


export {InputNode,OutputNode,LLMNode,nodeTypes,TextUpdaterNode};