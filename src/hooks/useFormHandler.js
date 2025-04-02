import { useSelector, useDispatch } from "react-redux";
import { setFormPreviewOpen } from "../redux/reducers/formHandling/formHandleReducer";

const useFormHandle = () => {
  const dispatch = useDispatch();
  const { isFormPreviewOpen } = useSelector((state) => state.formHandler);

  const handleFormPreviewOpen = (value) => {
    //value must be true or false
    dispatch(setFormPreviewOpen(value));
  };

  return {
    isFormPreviewOpen,
    setFormPreviewOpen: handleFormPreviewOpen,
  };
};

export default useFormHandle;
