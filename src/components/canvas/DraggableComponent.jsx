import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {DesignerComponent} from "../DragableElementConfig/TextField";

function DraggableComponent({
  component,
  index,
  handleSelectComponent,
  handleDeleteComponent,
  moveComponent,
  selectedComponent,
}) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CANVAS_COMPONENT",
    item: { id: component.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CANVAS_COMPONENT",
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveComponent(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`relative p-3 bg-white border rounded-md shadow-sm transition-all duration-200 cursor-pointer ${
        selectedComponent?.id === component.id
          ? "border-blue-500 ring-2 ring-blue-400"
          : ""
      }`}
    >
      <DesignerComponent element={component} />
      <div
        className="absolute top-1 right-1 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {selectedComponent?.id === component.id && (
          <button
            className="text-red-500 p-1 hover:bg-red-200 rounded-md"
            onClick={() => handleDeleteComponent(component)}
          >
            <FiTrash2 size={18} />
          </button>
        )}
        <button
          className="text-blue-500 p-1 hover:bg-blue-200 rounded-md"
          onClick={() => handleSelectComponent(component)}
        >
          <FiEdit size={18} />
        </button>
      </div>
    </div>
  );
}

export default DraggableComponent;
