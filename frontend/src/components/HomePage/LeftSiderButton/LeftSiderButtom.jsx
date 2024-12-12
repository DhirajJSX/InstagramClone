import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function LeftSiderButtom() {
  return (

    <>
      <ul>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className="text-2xl"><SettingsIcon style={{ fontSize: "30px", marginBottom: "3px" }} /></span>
          <p className="text-lg truncate">Settings</p>
        </li>
        <li className="flex items-center space-x-4 p-3 my-0.5  rounded-md hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 ease-out cursor-pointer">
          <span className="text-2xl"><AutoFixHighIcon style={{ fontSize: "30px", marginBottom: "3px" }}/></span>
          <p className="text-lg truncate">Ai Studio</p>
        </li>
      </ul>
    </>
  );
}

export default LeftSiderButtom;
