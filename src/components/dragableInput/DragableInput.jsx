import React from "react";
import { useDrag } from "react-dnd";
function DragableInput({ el }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: el,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { label, Icon } = el.designerBtnElement;
  return (
    <>
      <div
        key={`designer-button-${el.type}`}
        ref={drag}
        className={`p-2 flex items-center ${
          isDragging ? "border-2 border-dotted" : ""
        }  bg-gray-800 mb-2 rounded-md cursor-pointer`}
      >
        <span className="text-sm mr-2">{label}</span>
        <Icon className="h-8 w-8 text-blue-100" />
      </div>
      {/* <div
        key={el.id}
        ref={drag}
        className={`p-3 flex items-center ${
          isDragging ? "border-2 border-dotted" : ""
        }  bg-gray-800 mb-2 rounded-md cursor-pointer`}
      >
        <span className="text-2xl mr-2">{el.icon}</span>
        {el.name}
      </div> */}
    </>
  );
}

export default DragableInput;
