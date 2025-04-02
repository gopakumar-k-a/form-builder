import { FaCirclePlus } from "react-icons/fa6";
import React from "react";
import { FiSave } from "react-icons/fi";
const LeftSideBarButton = ({onClick}) => {
  return (
    <div>
      <button onClick={onClick} className="flex justify-center absolute top-10 left-10 gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
        <FaCirclePlus size={20} />
        <span>  Insert</span>
      </button>
    </div>
    // <div className="flex items-center space-x-4">

    //   <button onClick={onClick} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center space-x-2">
    //   <FaCirclePlus size={20} />
    //     <span>Insert</span>
    //   </button>
    // </div>
  );
};

export default LeftSideBarButton;
