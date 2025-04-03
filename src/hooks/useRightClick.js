// Custom hook to use the right click context
import { RightClickContext } from "../contexts/rightClickContexts";

export const useRightClick = () => {
  return useContext(RightClickContext);
};
