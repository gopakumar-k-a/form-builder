import { FaPencilAlt } from "react-icons/fa";
import React from "react";
const RightSideBarButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-10 right-10 flex items-center gap-2 !important bg-green-500  text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
    >
      <FaPencilAlt size={20} />
      <span>Edit</span>
    </button>
  );
};

export default RightSideBarButton;
