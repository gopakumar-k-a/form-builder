import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import PropertyForms from "../forms/PropertyForms";
// import { RxCross2 } from "react-icons/rx";
import useCanvas from "../../hooks/useCanvas";
const RightSidebar = ({ isOpen, toggleSidebar, setRightSideBarOpen }) => {
  const {selectedComponent}=useCanvas()
  // const { selectedComponent } = useSelector((state) => state.canvas);
  useEffect(() => {
    if (selectedComponent) {
      console.log("selected  component ", selectedComponent);

      setRightSideBarOpen(true); // Open sidebar when a component is selected
    }
  }, [selectedComponent, setRightSideBarOpen]);

  const [sdf,dsf]=useState('properies')
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-white text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Right Sidebar</h2>
      {selectedComponent ? (
        <>
     {/* <h1>hii</h1> */}
          <PropertyForms />
        </>
      ) : (

        <p className="text-sm text-gray-400">Select a component to edit.</p>
      )}
      {/* <ul>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Item 1</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Item 2</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Item 3</li>
      </ul> */}
    </div>
  );
};
export default RightSidebar;
