import React, { useEffect, useState } from "react";
import LeftSideBarButton from "../components/buttons/roundedButons/LeftSideBarButton";
import RightSideBarButton from "../components/buttons/roundedButons/RightSideBarButton";
import LeftSidebar from "../components/sideBar/LeftSideBar";
import RightSidebar from "../components/sideBar/RightSideBar";
import Canvas from "../components/canvas/Canvas";
// import { useSelector, useDispatch } from "react-redux";
//import { setSelectedComponent } from "../redux/reducers/canvas/canvasReducer";
import useCanvas from "../hooks/useCanvas";
function FormBuilderPage() {
  // const dispatch = useDispatch();
  const {setSelectedComponent,selectedComponent}=useCanvas()
  const [isLeftSideBarOpen, setLeftSideBarOpen] = useState(false);
  const [isRightSideBarOpen, setRightSideBarOpen] = useState(false);
  // const { selectedComponent } = useSelector((state) => state.canvas);
  const handleLeftSideBarToggle = () => {
    setLeftSideBarOpen((prev) => !prev);
  };
  const handleRightSideBarToggle = () => {
    setRightSideBarOpen((prev) => !prev);
    setSelectedComponent({ operation: "remove" })
    console.log("isRightSideBarOpen - ", isRightSideBarOpen);
  };
  useEffect(() => {
    selectedComponent ? setRightSideBarOpen(true) : setRightSideBarOpen(false);

  }, [selectedComponent]);
  useEffect(() => {

    console.log("isRightSideBarOpen  inside useeffct ", isRightSideBarOpen);

  },[isRightSideBarOpen])
  return (
    <>
    
      <Canvas isLeftOpen={isLeftSideBarOpen} isRightOpen={setRightSideBarOpen} />
      <LeftSidebar
        isOpen={isLeftSideBarOpen}
        toggleSidebar={() => handleLeftSideBarToggle()}
      />
      {isRightSideBarOpen && (
      <RightSidebar
        isOpen={isRightSideBarOpen}
        toggleSidebar={() => handleRightSideBarToggle()}
        setRightSideBarOpen={setRightSideBarOpen}
      />
      )}
      {!isLeftSideBarOpen && (
        <>
          <LeftSideBarButton onClick={handleLeftSideBarToggle} />
        </>
      )}
      
    </>
  );
}

export default FormBuilderPage;
