import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ProfileIcon from '@mui/icons-material/PersonOutlineOutlined';
function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-black border-t  border-gray-300 dark:border-gray-700 flex justify-around items-center px-1 py-2 lg:hidden z-50">
      <button className="text-gray-600 dark:text-gray-300 p-2"><HomeOutlinedIcon /></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><SearchIcon /></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><AddBoxRoundedIcon /></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><FavoriteBorderRoundedIcon /></button>
      <button className="text-gray-600 dark:text-gray-300 p-2"><ProfileIcon /></button>
    </nav>
  );
}

export default BottomNav;
