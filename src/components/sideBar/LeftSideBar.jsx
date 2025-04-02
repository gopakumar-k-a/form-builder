import React from "react";
import DragableInput from "../DragableInput/DragableInput";
import { TextFieldFormElement } from "../DragableElementConfig/TextFieldFormElement";
import { formElements } from "../DragableElementConfig/FormElements";
import useFormHandle from "../../hooks/useFormHandler";
const LeftSidebar = () => {
  // const [elements, setElements] = useState([]);
  const { isLeftSideBarOpen, setLeftSideBarOpen } = useFormHandle();
  // useEffect(() => {
  //   fetch("/toolbox.json")
  //     .then((res) => res.json())
  //     .then((data) => setElements(data))
  //     .catch((err) => console.error("Error loading toolbox data:", err));
  // }, []);
  const handleToggleRightSideBar = () => {
    setLeftSideBarOpen(!isLeftSideBarOpen);
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-50 bg-gray-900 text-white p-4 transition-transform transform ${
        isLeftSideBarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={handleToggleRightSideBar}
        className="absolute top-4 right-4 text-white text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4 text-green-400">Add Field</h2>
      {Object.values(formElements).map((el) => (
        <DragableInput el={el} key={el.type} />
      ))}

      {/* {elements?.length &&
        elements.map((el) => <DragableInput el={el} key={el.id} />)} */}
    </div>
  );
};

export default LeftSidebar;
