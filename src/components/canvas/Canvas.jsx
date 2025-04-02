import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

// import {
//   setComponents,
//   setSelectedComponent,
// } from "../../redux/reducers/canvas/canvasReducer";
import { FiEdit, FiTrash2 } from "react-icons/fi";
// import RenderComponent from "../renderInput/RenderInput";
// import { DesignerComponent } from "../DragableElementConfig/TextFieldFormElement";
import { formElements } from "../DragableElementConfig/FormElements";
import { uniqueIdGenerator } from "../../lib/uniqueIdGenerator";
import DraggableComponent from "./DraggableComponent";
import CanvasHeader from "./CanvasHeader";
import useCanvas from "../../hooks/useCanvas";
import useFormHandle from "../../hooks/useFormHandler";
const Canvas = () => {
  const {isLeftSideBarOpen,isRightSideBarOpen}=useFormHandle()

  // const dispatch = useDispatch();
  // const { components, selectedComponent } = useSelector(
  //   (state) => state.canvas
  // );
  const { components, selectedComponent, setComponents, setSelectedComponent } =
    useCanvas();
  const debounceTimeout = useRef(null);
  // const [showButtons, setShowButtons] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    if (components && components?.length) {
      console.log(components, " components");
      console.log(isRightSideBarOpen+" isRightSideBarOpen")  
      console.log(isLeftSideBarOpen+" isLeftSideBarOpen")
    
    }
  }, [components]);
  const [{ isOverCanvas }, dropCanvas] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item, monitor) => {
      const didChild = monitor.getDropResult();
      if (didChild && didChild.handled) {
        //if we have added a new element on top of existing canvas element no need to add the element again
        return; // Child already handled the drop, do nothing
      }
      addComponentToCanvas(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // const [{ isOverElement }, dropElement] = useDrop({
  //   accept: "FORM_ELEMENT",
  //   drop: (item) => console.log("Dropped inside element"),
  //   collect: (monitor) => ({
  //     isOverElement: !!monitor.isOver(),
  //   }),
  // });
  const handleMouseEnter = (index) => {
    clearTimeout(debounceTimeout.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 100); // 100ms delay before hiding buttons
  };

  const addComponentToCanvas = (item, index = null) => {
    console.log("dragged item addComponentToCanvas index ", index);

    const newElement = item.construct(uniqueIdGenerator());
    console.log("new element ", newElement);

    // dispatch(
    setComponents({
      operation: "add",
      item: newElement,
      index, // Pass index for positioning
    });
    // );
    handleMouseLeave();
  };

  const handleSelectComponent = (component) => {
    // dispatch(
    setSelectedComponent({ operation: "add", item: { ...component } });
    // );
  };

  const handleDeleteComponent = (component) => {
    // dispatch(

    setComponents({ operation: "remove", item: component });

    // );
    handleMouseLeave();
  };
  const moveItem = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    // let updatedComponents = [...components];

    // updatedComponents.splice(
    //   toIndex,
    //   0,
    //   updatedComponents.splice(fromIndex, 1)[0]
    // );

    // dispatch(

    setComponents({ operation: "swap", fromIndex, toIndex });

    // );
    handleMouseLeave();
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };
  function calculateCanvasLength() {
    if (isLeftSideBarOpen && isRightSideBarOpen) {
      return "col-span-12 md:col-span-8";
    } else if (isLeftSideBarOpen || isRightSideBarOpen) {
      return "col-span-12 md:col-span-10";
    } else {
      return "col-span-12";
    }
  }
  
  return (
    <div className="grid grid-cols-12 w-screen  justify-center absolute top-0 left-0 bg-gray-100 min-h-screen">
      {isLeftSideBarOpen &&
            <div className="bg-gray-900 col-span-12 md:col-span-2 h-screen hidden md:block"></div>
}
      <div
        className={`bg-white ${
          calculateCanvasLength()
        } min-h-screen p-6 border border-gray-300`}

        ref={dropCanvas}
        // onDrop={handleDrop}
        // onDragOver={handleDragOver}
        id="dropCanvas"
      >
        <CanvasHeader />

        {components.length === 0 && (
          <p className="text-gray-500 text-center italic">Drag elements here</p>
        )}

        <div className="grid gap-4 p-4 bg-white shadow-md rounded-md">
          {components.map((component, index) => (
            // <DraggableComponent
            //   component={component}
            //   handleDeleteComponent={handleDeleteComponent}
            //   handleSelectComponent={handleSelectComponent}
            //   selectedComponent={selectedComponent}
            //   moveComponent={moveComponent}
            // />
            <div
              // ref={dropElement}
              key={component.id}
              className={`relative p-3 bg-white border rounded-md shadow-sm transition-all duration-200 cursor-pointer ${
                selectedComponent?.id === component.id
                  ? "border-blue-500 ring-2 ring-blue-400"
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              // onDrop={handleDrop}

              // onClick={() => handleSelectComponent(component)}
            >
              {/* <h1 className="text-amber-400"> component{component.id}</h1>
              <h1 className="text-amber-400">
                selected{selectedComponent?.id}
              </h1> */}
              {/* <span className="text-2xl mr-2">{component.icon || "❓"}</span> */}
              {/* {RenderComponent(component)} */}
              {/* <div ref={dropElement} key={component.id} className="canvas-item"> */}
              <DesignerElementWrapper
                el={component}
                index={index}
                moveItem={moveItem}
                addComponentToCanvas={addComponentToCanvas}
              />
              {/* </div> */}
              {/* <div
                className="absolute top-1 right-1 bg-red-500 flex gap-2"
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating
              > */}

              {/* </div> */}
              <div
                className={`absolute top-1 right-1 flex gap-2 ${
                  selectedComponent?.id === component.id ||
                  hoveredIndex === index
                    ? ""
                    : "hidden"
                }`}
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating
              >
                {/* {selectedComponent?.id === component.id && ( */}
                <button
                  className="text-red-500 p-1 hover:bg-red-200 rounded-md"
                  onClick={() => handleDeleteComponent(component)}
                >
                  <FiTrash2 size={18} />
                </button>
                {/* )} */}
                <button
                  className="text-blue-500 p-1 hover:bg-blue-200 rounded-md"
                  onClick={() => handleSelectComponent(component)}
                >
                  <FiEdit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedComponent && (
          <pre className="text-amber-300">
            {JSON.stringify(selectedComponent, null, 2)}
          </pre>
        )}
      </div>
{/* {!isRightSideBarOpen &&<div className="bg-gray-900 col-span-12 md:col-span-2 h-screen hidden md:block"></div>
} */}
    </div>
  );
};

function DesignerElementWrapper({
  el,
  index,
  moveItem,
  addComponentToCanvas,
  // onMouseEnter,
  // onMouseLeave,
}) {
  // const { DesignerComponent } = formElements[el.type];
  const DesignerComponent = formElements[el.type].designerComponent();

  const ITEM_TYPE = "CANVAS_ITEM";
  const FORM_ELEMENT_TYPE = "FORM_ELEMENT";
  const [{ isDragging }, ref] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [{ isOver }, drop] = useDrop({
    accept: [ITEM_TYPE, FORM_ELEMENT_TYPE],
    drop: (draggedItem) => {
      if (draggedItem?.index && draggedItem.index !== index) {
        //if there is index it means we are swapping added canvas elements
        console.log("dragged item if", draggedItem);
        moveItem(draggedItem.index, index);
        // draggedItem.index = index; // Update index after moving
      } else {
        console.log("dragged item else index", draggedItem, "-> ", index);
        //if there is no index it means we are adding a new element on top of existing canvas element
        addComponentToCanvas(draggedItem, index);
      }
      return { handled: true };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const computedClass = `
  ${
    isDragging
      ? "bg-blue-200 border-blue-500 opacity-50 shadow-lg ring-2 ring-blue-400"
      : ""
  }
  ${
    isOver
      ? "bg-green-200 border-green-500 ring-2 ring-green-400"
      : "bg-gray-100 border-gray-300"
  }
`;
  return (
    <>
      {/* <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> */}
      <div className="border-red-800">
        <DesignerComponent
          innerRef={(node) => ref(drop(node))}
          elementInstance={el}
          className={computedClass}
        />
      </div>
      {/* </div> */}
    </>
  );
}

export default Canvas;
