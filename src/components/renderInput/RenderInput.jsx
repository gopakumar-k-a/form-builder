import React from "react";

const RenderComponent = (component) => {
  switch (component.type) {
    case "textbox":
      return (
        <input
          type="text"
          placeholder={component.attributes?.placeholder || "Enter text"}
          className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
          required={component.attributes?.required || false}
          readOnly
        />
      );

    case "dropdown":
      return (
        <select className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300">
          {component.options?.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      );

    case "date":
      return (
        <input
          type="date"
          className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
          readOnly
        />
      );

    case "checkbox":
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.attributes?.checked || false}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
            readOnly
          />
          <span className="ml-2">{component.name}</span>
        </div>
      );

    case "radio":
      return (
        <div>
          {component.options?.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={component.id}
                className="w-4 h-4"
                readOnly
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );

    default:
      return <p className="italic text-gray-500">Unknown Component</p>;
  }
};

export default RenderComponent;
