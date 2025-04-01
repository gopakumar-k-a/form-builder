import React from "react";
// import { useSelector } from "react-redux";
import { formElements } from "../DragableElementConfig/FormElements";
import useCanvas from "../../hooks/useCanvas";
function PropertyForms() {
  const {selectedComponent}=useCanvas()
  // const { selectedComponent } = useSelector((state) => state.canvas);
  if (!selectedComponent) return null;
  const PropertiesComponent =
    formElements[selectedComponent.type].propertiesComponent();

  return (
    <>
      {selectedComponent ? (
        <>
          <PropertiesComponent elementInstance={selectedComponent} />
        </>
      ) : (
        <>
          <p className="text-sm text-gray-300">
            please select a component to continue
          </p>
        </>
      )}
    </>
  );
}

export default PropertyForms;
