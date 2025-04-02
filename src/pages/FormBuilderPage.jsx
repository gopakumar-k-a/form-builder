import React, { useEffect, useState } from "react";
import LeftSideBarButton from "../components/buttons/roundedButons/LeftSideBarButton";
import RightSideBarButton from "../components/buttons/roundedButons/RightSideBarButton";
import LeftSidebar from "../components/sideBar/LeftSideBar";
import RightSidebar from "../components/sideBar/RightSideBar";
import Canvas from "../components/canvas/Canvas";
// import { useSelector, useDispatch } from "react-redux";
//import { setSelectedComponent } from "../redux/reducers/canvas/canvasReducer";
import useCanvas from "../hooks/useCanvas";
import useFormHandle from "../hooks/useFormHandler";

function FormBuilderPage() {
  // const dispatch = useDispatch();
  const { isLeftSideBarOpen, isRightSideBarOpen, setRightSideBarOpen } =
    useFormHandle();
  const { selectedComponent } = useCanvas();
  // const [isLeftSideBarOpen, setLeftSideBarOpen] = useState(false);
  // const [isRightSideBarOpen, setRightSideBarOpen] = useState(false);
  // const { selectedComponent } = useSelector((state) => state.canvas);

  useEffect(() => {
    selectedComponent ? setRightSideBarOpen(true) : setRightSideBarOpen(false);
  }, [selectedComponent]);
  useEffect(() => {
    console.log("isRightSideBarOpen  inside useeffct ", isRightSideBarOpen);
  }, [isRightSideBarOpen]);
  return (
    <>
      <Canvas />
      <LeftSidebar />
      {isRightSideBarOpen && <RightSidebar />}
      {!isLeftSideBarOpen && (
        <>
          <LeftSideBarButton />
        </>
      )}
    </>
  );
}

export default FormBuilderPage;
