import React, { useCallback } from 'react';
import logo from "../assets/logoimage.svg";
import playicon from "../assets/playicon.svg"

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center shadow-md py-2'>
            <img src={logo} className=' ml-[45px]'/> 
            <div className=' mr-[65px] flex justify-end items-center gap-5'>
              <button className=' px-4 py-1 bg-[rgba(0,0,0,0.3)] rounded-md text-white font-semibold text-[14px]' >Deploy</button>
              <button className=' bg-[#44924C] flex justify-center gap-1 items-center px-4 py-1 rounded-[8px]' >
                <img src={playicon} className='' />
                <span className=' text-white font-semibold text-[14px]'>Run</span>
                </button>
            </div>
        </div>
  )
}

export default Navbar;