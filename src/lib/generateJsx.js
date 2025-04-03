import React from "react";
import { formElements } from "../components/DragableElementConfig/FormElements";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import reactElementToJSXString from "react-element-to-jsx-string";

export const generateHTMLStringsForBackend = (components) => {
  // console.log("Generating HTML strings for backend:", components);

  const generatedHtml = components.map((component) => {
    const FormElementConfig = formElements[component.type];
    const FormComponent = FormElementConfig?.formComponent();
    const jsxElement = React.createElement(FormComponent, {
      key: component.id,
      elementInstance: component,
    });
    // let htmlString = renderToString(jsxElement);
    // return htmlString;
    // return jsxElement
    return renderToStaticMarkup(jsxElement);
  });

  return generatedHtml;
};
const generateComponent = (component) => {

  const { label, required, placeHolder, helperText } =
  component.extraAttributes;
  switch (component.type) {
    case "textField":
      return `
      <div className="flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all"> 
        <div className="relative">
          <label htmlFor="${label}" className="text-sm font-medium">
            ${label} ${required ? '<span className="text-red-500">*</span>' : ""}
          </label>
          <textarea
            id="${label}"
            placeholder="${placeHolder || ""}"
            className="w-full h-24 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-left resize-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        ${helperText ? `<p className="text-gray-500 text-xs">${helperText}</p>` : ""}
      </div>`;
    default:
      return "";
  }
};

export const generateFinalFormHTML = (components) => {
  // Generate HTML strings from components
  const formElementsHTML = generateHTMLStringsForBackend(components).join("\n");
  // const formElementsJSX = components
  //   .map((component) => {
  //     const FormComponent = formElements[component.type]?.formComponent;

  //     if (!FormComponent) {
  //       console.warn(`Component type "${component.type}" not found.`);
  //       return ""; // Skip if the component type is not found
  //     }

  //     const jsxString = renderToStaticMarkup(
  //       <FormComponent elementInstance={component} />
  //     );

  //     return jsxString;
  //   })
  //   .filter(Boolean) // Remove empty strings
  const formSkeleton = `
  import React from "react";
  const FormSkelton = () => {
  return (
    <form className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Generated Form</h2>
      <div className="flex flex-col gap-4">
         ${components.map((component)=>generateComponent(component))}
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormSkelton;

  `;

  console.log("generateFinalFormHTML formSkeleton ", formSkeleton);
};
