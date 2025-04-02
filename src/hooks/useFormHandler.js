import { useSelector, useDispatch } from "react-redux";
import {
  setFormPreviewOpen,
  setLeftSideBarOpen,
  setRightSideBarOpen,
} from "../redux/reducers/formHandling/formHandleReducer";

const useFormHandle = () => {
  const dispatch = useDispatch();
  const { isFormPreviewOpen, isLeftSideBarOpen, isRightSideBarOpen } =
    useSelector((state) => state.formHandler);

  const handleFormPreviewOpen = (value) => {
    //value must be true or false
    dispatch(setFormPreviewOpen(value));
  };

  const handleLeftSideBarOpen = (value) => {
    //value must be true or false
console.log(' handleLeftSideBarOpen value ',value);

    dispatch(setLeftSideBarOpen(value));
  };
  const handleRightSideBarOpen = (value) => {
    //value must be true or false

    dispatch(setRightSideBarOpen(value));
  };

  return {
    isFormPreviewOpen,
    isLeftSideBarOpen,
    isRightSideBarOpen,
    setFormPreviewOpen: handleFormPreviewOpen,
    setLeftSideBarOpen: handleLeftSideBarOpen,
    setRightSideBarOpen: handleRightSideBarOpen,
  };
};

export default useFormHandle;
