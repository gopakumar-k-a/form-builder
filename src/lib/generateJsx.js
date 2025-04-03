import React from 'react';
import { formElements } from "../components/DragableElementConfig/FormElements";
import { renderToString } from "react-dom/server";
// import ReactDOMServer from 'react-dom/server';
export const generateHTMLStringsForBackend = (components) => {
    console.log("Generating HTML strings for backend:", components);
  
    return components.map((component) => {
      const FormElementConfig = formElements[component.type];
      const FormComponent = FormElementConfig?.formComponent();
      console.log("Component for", component.type, ":", FormComponent);

      if (!FormComponent) {
        console.warn(`Component not found for type: ${component.type}`);
        return {
          id: component.id,
          type: component.type,
          error: "Component not found",
        };
      }
  
      // The FormComponent now receives the entire elementInstance as props
    //   const jsxElement = <FormComponent key={component.id} elementInstance={component} />;
    const jsxElement = React.createElement(FormComponent, {
        key: component.id,
        elementInstance: component
      });
      const htmlString = renderToString(jsxElement);
  
      return {
        id: component.id,
        type: component.type,
        htmlString: htmlString,
        extraAttributes: component.extraAttributes,
      };
    });
  };
// export const generateJSXCode = (components) => {
//     console.log("Generating JSX for components:", components);
  
//     return components.map((component) => {
//       const FormComponent = formElements[component.type]?.formComponent;
  
//       if (!FormComponent) {
//         console.warn(`Component not found for type: ${component.type}`);
//         return {
//           id: component.id,
//           type: component.type,
//           error: "Component not found",
//         };
//       }
  
//       const jsxElement = <FormComponent key={component.id} elementInstance={component} />;
  
//       return {
//         id: component.id,
//         type: component.type,
//         jsxString: renderToString(jsxElement), // ✅ Convert JSX to a string before logging
//       };
//     });
//   };
  
// export const generateJSXCode = (components) => {
//   console.log("components in generateJSXCode are ", components);

//     return components.map((component) => {
//       const FormComponent = formElements[component.type]?.formComponent

//       if (!FormComponent) {
//         console.warn(`Component not found for type: ${component.type}`);
//         return null;
//       }

//       return <FormComponent key={component.id} elementInstance={component} />;
//     });
// };
