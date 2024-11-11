import React from 'react'
import inputicon from "../assets/inputicon.svg";
import llmicon from "../assets/llmicon.svg";
import outputicon from "../assets/outputicon.svg";
import Vector from "../assets/Vector.svg";

const Sidebar = ({onDragStart})=>{
    return(
      <div className=" bg-white w-[250px] h-[93%] ml-4 rounded-[20px] flex flex-col border-[1px] border-[#E4E8EE] -mt-6 py-5 px-6">
                <span className=" text-[18px] font-semibold">Components</span>
                <span className=" w-full h-[1px] my-4 bg-[rgba(0,0,0,0.2)]"></span>
                <span className=" text-[rgba(68,68,68,0.5)] text-sm">
                  Drag and Drop
                </span>
                <div onDragStart={(event) => onDragStart(event, 'inputnode')} draggable
                 className="flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px]  border-[rgba(148,163,184,1)] cursor-pointer">
                  <div className=" flex justify-start gap-2 items-center">
                    <img src={inputicon} />
                    <span className=" text-[12px] font-[400]">Input</span>
                  </div>
                  <img src={Vector} />
                </div>
                <div onDragStart={(event) => onDragStart(event, 'llmnode')} draggable
                 className="flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px] border-[rgba(148,163,184,1)] cursor-pointer">
                  <div className=" flex justify-start gap-2 items-center">
                    <img src={llmicon} />
                    <span className=" text-[12px] font-[400]">LLM Engine</span>
                  </div>
                  <img src={Vector} />
                </div>
                <div onDragStart={(event) => onDragStart(event, 'outputnode')} draggable
                className="flex justify-between items-center mt-4 p-2 px-3 border-[1px] rounded-[5px] border-[rgba(148,163,184,1)] cursor-pointer">
                  <div className=" flex justify-start gap-2 items-center">
                    <img src={outputicon} />
                    <span className=" text-[12px] font-[400]">Output</span>
                  </div>
                  <img src={Vector} />
                </div>
              </div>
    );
  }

export default Sidebar