import React from 'react';

function DeleletComment({ onCancel, onConfirm }) {
  return (
    <div className='flex items-center text-white justify-center fixed inset-0 bg-black bg-opacity-50'>
      <div className="bg-[#1A1A1A] p-6 rounded-md m-10 max-w-sm w-full md:max-w-md">
        <h2 className="text-center text-[15px] font-semibold mb-4">
          Are you sure you want to delete this comment?
        </h2>
        <div className="flex flex-col gap-2 justify-center ">
          <button 
            onClick={onCancel} 
            className=" hover:bg-[#313131] transition-all ease-in-out px-5 py-2 rounded-md w-full md:w-auto"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-600 text-white px-5  py-2 rounded-md w-full md:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleletComment;
