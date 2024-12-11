import React from "react";

function RightSidebar() {
  return (
    <aside className="w-[20%] hidden mr-20 lg:block px-10 py-6">
      <div className="space-y-4">
        <div className="flex items-center ">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa6anMnzXDiZrZ2OEo_fxPikq4Gh_7zGRCP-0_NqnNmtAQ3aAapoTKl0QcWpu3S0Alurw&usqp=CAU" alt="Profile" className="w-12 h-12 rounded-full object-cover bg-gray-300 dark:bg-gray-600" />
          <div className="ml-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">dhiraj.bhawsar_</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dhiraj</p>
          </div>
        </div>
        <div>
          <p className="font-semibold  my-5 text-gray-400">Suggested for you</p>
          <ul className="space-y-4 mt-10">
              {Array(5).fill(null).map((_, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqH1xMdB_eDuui9nFx0e68olzk7w7mw7TdXpGJqqmXyrAU6tdLlkEZUbEHXYdTuHsy8jA&usqp=CAU" alt="Profile" className="w-10 h-10 object-cover  rounded-full bg-gray-300 dark:bg-gray-600" />
                  <p className="ml-4 text-sm text-gray-700 dark:text-gray-300">User {idx + 1}</p>
                </div>
                <button className="text-blue-500 text-sm">Follow</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
