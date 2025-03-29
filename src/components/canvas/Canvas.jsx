import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setComponents, setSelectedComponent } from "../../redux/reducers/canvas/canvasReducer";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import RenderComponent from "../renderInput/RenderInput";

const Canvas = () => {
  const dispatch = useDispatch();
  const { components, selectedComponent } = useSelector((state) => state.canvas);
useEffect(()=>{
  if(components && components?.length){

    console.log(components ,' components');
  }

},[components])
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item) => addComponentToCanvas(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addComponentToCanvas = (item) => {
    const uniqueInstanceId = `${item.id}-${Date.now()}`;
    dispatch(setComponents({ operation: "add", item: { id: uniqueInstanceId, ...item } }));
  };

  const handleSelectComponent = (component) => {
    dispatch(setSelectedComponent({ operation: "add", item: {...component} }));
  };

  const handleDeleteComponent = (component) => {
    dispatch(setComponents({ operation: "remove", item: component }));
  };



  return (
    <div className="grid grid-cols-12 w-screen absolute top-0 left-0 bg-gray-100 min-h-screen">
      <div className="bg-gray-900 col-span-12 md:col-span-2 h-screen hidden md:block"></div>

      <div className="bg-white col-span-12 md:col-span-8 h-screen p-6 border border-gray-300" ref={drop}>
        <h2 className="text-xl font-semibold mb-4">Form Canvas</h2>
        {components.length === 0 && <p className="text-gray-500 text-center italic">Drag elements here</p>}

        <div className="grid gap-4 p-4 bg-white shadow-md rounded-md">
          {components.map((component) => (
            <div
              key={component.id}
              className={`relative p-3 bg-white border rounded-md shadow-sm transition-all duration-200 cursor-pointer ${
                selectedComponent?.id === component.id ? "border-blue-500 ring-2 ring-blue-400" : ""
              }`}
              onClick={() => handleSelectComponent(component)}
            >
              {/* <span className="text-2xl mr-2">{component.icon || "❓"}</span> */}
              {RenderComponent(component)}

              {selectedComponent?.id === component.id && (
                <div className="absolute top-1 right-1 flex gap-2">
                  <button
                    className="text-blue-500 p-1 hover:bg-blue-200 rounded-md"
                    onClick={() => handleSelectComponent(component)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 p-1 hover:bg-red-200 rounded-md"
                    onClick={() => handleDeleteComponent(component)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 col-span-12 md:col-span-2 h-screen hidden md:block"></div>
    </div>
  );
};

export default Canvas;
