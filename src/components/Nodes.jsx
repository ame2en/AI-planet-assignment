import React,{useMemo} from "react";
import inputicon from "../assets/inputicon.svg";
import llmicon from "../assets/llmicon.svg";
import outputicon from "../assets/outputicon.svg";
import "@xyflow/react/dist/style.css";
import { Handle, Position } from "@xyflow/react";

const InputNode = ({ data }) => {
  return (
    <>
      <div className="bg-white rounded-[12px] shadow-md pb-[100px] w-[325px]">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-2">
            <img src={inputicon} />
            <span className=" font-semibold">INPUT</span>
          </div>
          <button className=" w-[12px] h-[12px] bg-[#383838] rounded-full"></button>
        </div>

        <p className="text-sm bg-[rgba(238,244,255,1)] text-[rgba(102,102,102,1)] p-3">
          Write the input/ question you want to ask
        </p>
        <div className=" mt-5 mx-5">
          <span className=" text-sm ">Input</span>
          <input
            type="text"
            placeholder="Type Something..."
            className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm "
            value={data.input}
            onChange={(e) => data.onChange('input', e.target.value)}
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{
          top: 280,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: "white",
        }}
      ><span className=" absolute -left-[100px] -top-3" >LLM Engine</span></Handle>
       
    </>
  );
};

const LLMNode = ({ data }) => {
  return (
    <div className="bg-white rounded-[12px] shadow-md pb-[100px] w-[325px]">
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-2">
          <img src={llmicon} />
          <span className=" font-semibold">LLM ENGINE</span>
        </div>
        <button className="w-[12px] h-[12px] bg-[#383838] rounded-full"></button>
      </div>
      <p className="text-sm bg-[rgba(238,244,255,1)] text-[rgba(102,102,102,1)] p-3">
        Lorem ipsum sic dolar amet{" "}
      </p>
      <div className="  mt-5 mx-5">
        <label className="block text-sm font-medium text-gray-700">
          Model Name
        </label>
        <div className="relative">
          <select
            className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm"
            value={data.model}
            onChange={(e) => data.onChange("model", e.target.value)}
          >
            
            <option value="gpt-3.5" className="p-1">
              gpt-3.5
            </option>
            <option value="gpt-4" className="p-1">
              gpt-4
            </option>
          </select>

        </div>
      </div>
      <div className="  mt-5 mx-5">
        <label className="block text-sm font-medium text-gray-700">
          OpenAI API Base
        </label>
        <input
          type="text"
          placeholder="type something"
          className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm"
          value={data.apiBase}
          onChange={(e) => data.onChange("apiBase", e.target.value)}
        />
      </div>
      <div className="  mt-4 mx-5">
        <label className="block text-sm font-medium text-gray-700">
          OpenAI Key
        </label>
        <input
          type="password"
          placeholder="type something"
          className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm"
          value={data.apiKey}
          onChange={(e) => data.onChange("apiKey", e.target.value)}
        />
      </div>
      <div className="  mt-4 mx-5">
        <label className="block text-sm font-medium text-gray-700">
          Max Tokens
        </label>
        <input
          type="number"
          placeholder="type something"
          className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm"
          value={data.maxTokens}
          onChange={(e) => data.onChange("maxTokens", e.target.value)}
        />
      </div>
      <div className="  mt-4 mx-5">
        <label className="block text-sm font-medium text-gray-700">
          Temperature
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          className="mt-3 outline-none  block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm"
          value={data.temperature}
          onChange={(e) => data.onChange("temperature", e.target.value)}
        />
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="d"
        style={{
          top: 650,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: "white",
        }}
      >
        <span className=" absolute left-[20px] ">Input Node</span>
        </Handle>

      <Handle
        type="source"
        position={Position.Right}
        id="c"
        style={{
          top: 670,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: "white",
        }}
      >
      <span className=" absolute right-[30px] -bottom-4 ">Output Node</span>
      </Handle>
    </div>
  );
};

const OutputNode = ({ data }) => {
  return (
    <>
      <div className="bg-white rounded-[12px] shadow-md pb-[100px] w-[500px]">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-2">
            <img src={outputicon} />
            <span className="text-lg font-semibold">OUTPUT</span>
          </div>
          <button className="w-[12px] h-[12px] bg-[#383838] rounded-full"></button>
        </div>
        <p className="text-sm bg-[rgba(238,244,255,1)] text-[rgba(102,102,102,1)] p-3">
          Write the input/ question you want to ask
        </p>
        <div className=" mt-10 mx-5  ">
          <span className="font-medium text-gray-700 text-sm">
            Output Response
          </span>
          <div className="mt-3 outline-none   block w-full rounded-md p-3 px-4 border-[1px] border-[rgba(102, 102, 102, 0.35)] shadow-sm placeholder:text-sm ">
            {data.output || "Output Response will be shown here "}
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{
          top : 130,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: "white",
        }}
        >
        <span className=" absolute left-[30px] -bottom-3  w-[100px]">LLM Engine</span>
        </Handle>
    </>
  );
};

const nodeTypes = { inputnode : InputNode,llmnode : LLMNode,outputnode : OutputNode };
export { InputNode, OutputNode, LLMNode, nodeTypes};
