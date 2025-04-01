import { useDispatch, useSelector } from "react-redux";
import {
  setComponents,
  setSelectedComponent,
} from "../redux/reducers/canvas/canvasReducer";

// Custom hook to interact with the canvas state and actions
const useCanvas = () => {
  const dispatch = useDispatch();

  // Select the canvas state
  const components = useSelector((state) => state.canvas.components);
  const selectedComponent = useSelector(
    (state) => state.canvas.selectedComponent
  );

  // Action to set components
  const updateComponents = (payload) => {
    dispatch(setComponents(payload));
  };

  // Action to set selected component
  const updateSelectedComponent = (payload) => {
    dispatch(setSelectedComponent(payload));
  };

  return {
    components,
    selectedComponent,
    setComponents: updateComponents, 
    setSelectedComponent: updateSelectedComponent,
  };
};

export default useCanvas;
