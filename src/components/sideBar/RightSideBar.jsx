import React, { useEffect, useState } from "react";
import PropertyForms from "../forms/PropertyForms";
import useCanvas from "../../hooks/useCanvas";

const RightSidebar = ({ isOpen, toggleSidebar, setRightSideBarOpen }) => {
  const { selectedComponent } = useCanvas();
  const [activeTab, setActiveTab] = useState("properties");

  useEffect(() => {
    if (selectedComponent) {
     // console.log("selected component ", selectedComponent);
      //setRightSideBarOpen(true); // Open sidebar when a component is selected
    } else {
      setActiveTab("properties"); // Reset tab if no component is selected
    }
  }, [selectedComponent, setRightSideBarOpen]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-gray-900 text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-white text-xl focus:outline-none"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Right Sidebar</h2>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => handleTabClick("properties")}
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "properties"
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Properties
        </button>
        <button
          onClick={() => handleTabClick("validations")}
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "validations"
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Validations
        </button>
      </div>

      {selectedComponent ? (
        <div>
          {activeTab === "properties" && (
            <>
              {/* <h1>hii properties</h1> */}
              <PropertyForms />
            </>
          )}
          {activeTab === "validations" && (
            <div>
              <h1>This is Validations</h1>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400">Select a component to edit.</p>
      )}
    </div>
  );
};

export default RightSidebar;