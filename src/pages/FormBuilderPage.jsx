import React, { useState } from "react";
import LeftSideBarButton from "../components/buttons/roundedButons/LeftSideBarButton";
import RightSideBarButton from "../components/buttons/roundedButons/RightSideBarButton";
import LeftSidebar from "../components/sideBar/LeftSideBar";
import RightSidebar from "../components/sideBar/RightSideBar";
import Canvas from "../components/canvas/Canvas";

function FormBuilderPage() {
  const [isLeftSideBarOpen, setLeftSideBarOpen] = useState(false);
  const [isRightSideBarOpen, setRightSideBarOpen] = useState(false);
  const handleLeftSideBarToggle = () => {
    setLeftSideBarOpen((prev) => !prev);
  };
  const handleRightSideBarToggle = () => {
    setRightSideBarOpen((prev) => !prev);
  };
  return (
    <>
      <Canvas />
      <LeftSidebar
        isOpen={isLeftSideBarOpen}
        toggleSidebar={() => handleLeftSideBarToggle()}
      />

      <RightSidebar
        isOpen={isRightSideBarOpen}
        toggleSidebar={() => handleRightSideBarToggle()}
        setRightSideBarOpen={setRightSideBarOpen}
      />

      {!isLeftSideBarOpen && (
        <>
          <LeftSideBarButton onClick={handleLeftSideBarToggle} />
        </>
      )}
      {!isRightSideBarOpen && (
        <>
          <RightSideBarButton onClick={handleRightSideBarToggle} />
        </>
      )}
    </>
  );
}

export default FormBuilderPage;
