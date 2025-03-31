import React from "react";
import { MdOutlineTextFields } from "react-icons/md";

export const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here... ",
};
export const TextFieldFormElement = {
  type: "text-area",
  construct: (id) => ({
    id,
    type: "text-area",
    extraAttributes,
  }),
  designerComponent: () => <DesignerComponent />,
  formComponent: () => (
    <>
      <div>this is form component</div>
    </>
  ),
  designerBtnElement: {
    Icon: () => <MdOutlineTextFields className="h-8 w-8 text-blue-100" />,
    label: "Text Field",
  },
};

export function DesignerComponent({ element, innerRef, className}) {
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return (
    <div ref={innerRef} className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}>
      <div className="relative">
        <label htmlFor={label} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          readOnly
          disabled
          placeholder={placeHolder}
          className="w-full h-24 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-left resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
    </div>
  );
}

// export default TextElement;
