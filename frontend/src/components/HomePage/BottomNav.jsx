import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ProfileIcon from '@mui/icons-material/PersonOutlineOutlined';
function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-black border-t  border-gray-300 dark:border-gray-700 flex justify-around items-center pt-1 pb-2 lg:hidden z-50">
      <button className="text-gray-600 dark:text-gray-300 p-2"><HomeOutlinedIcon style={{fontSize:"30px"}} /></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><SearchIcon style={{fontSize:"30px"}}/></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><AddBoxRoundedIcon style={{fontSize:"30px"}}/></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><FavoriteBorderRoundedIcon style={{fontSize:"30px"}}/></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><ProfileIcon style={{fontSize:"30px"}}/></button>
    </nav>
  );
}

export default BottomNav;
