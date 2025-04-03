import { formElements } from "../components/DragableElementConfig/FormElements";
import { renderToString } from "react-dom/server";
export const generateJSXCode = (components) => {
    console.log("Generating JSX for components:", components);
  
    return components.map((component) => {
      const FormComponent = formElements[component.type]?.formComponent;
  
      if (!FormComponent) {
        console.warn(`Component not found for type: ${component.type}`);
        return {
          id: component.id,
          type: component.type,
          error: "Component not found",
        };
      }
  
      const jsxElement = <FormComponent key={component.id} elementInstance={component} />;
  
      return {
        id: component.id,
        type: component.type,
        jsxString: renderToString(jsxElement), // ✅ Convert JSX to a string before logging
      };
    });
  };
  
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
