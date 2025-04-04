import React from "react";
import { FiSave, FiEye } from "react-icons/fi";
import useFormHandle from "../../hooks/useFormHandler";
import LeftSideBarButton from "../buttons/roundedButons/LeftSideBarButton";
import PreviewModal from "../previewModal/PreviewModal";

const CanvasHeader = () => {
  const { isFormPreviewOpen, setFormPreviewOpen } = useFormHandle();
  const handlePreviewToggle = () => {
    setFormPreviewOpen(!isFormPreviewOpen);
  };
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between rounded-lg mb-4">
      <LeftSideBarButton />
      <h1 className="text-xl font-semibold">Form Builder</h1>

      <div className="flex items-center space-x-4">
        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center space-x-2">
          <FiSave />
          <span>Save</span>
        </button>
        <PreviewModal
          trigger={
            <button
              // onClick={handlePreviewToggle}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center space-x-2"
            >
              <FiEye />
              <span>Preview</span>
            </button>
          }
        />
        {/* <button
          // onClick={handlePreviewToggle}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center space-x-2"
        >
          <FiEye />
          <span>Preview</span>
        </button> */}
      </div>
    </header>
  );
};

export default CanvasHeader;
