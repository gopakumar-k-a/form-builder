import React, { useEffect } from "react";
import { MdOutlineTextFields } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";
export const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here... ",
};
export const TextFieldFormElement = {
  type: "textField",
  construct: (id) => ({
    id,
    type: "textField",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,

  propertiesComponent: () => PropertiesComponent,
  formComponent: () => FormComponent,
  designerBtnElement: {
    Icon: () => <MdOutlineTextFields className="h-8 w-8 text-blue-100" />,
    label: "Text Field",
  },
};

export function DesignerComponent({ elementInstance, innerRef, className }) {
  const { label, required, placeHolder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div
      ref={innerRef}
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
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
export const PropertiesComponent = ({ elementInstance }) => {
  const { setComponents } = useCanvas();
  const { extraAttributes, id, type } = elementInstance;
  useEffect(() => {
    console.log("elementInstance ", elementInstance);
  }, [elementInstance]);
  const formik = useFormik({
    initialValues: extraAttributes,
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      placeHolder: Yup.string().required("Placeholder is required"),
    }),
    onSubmit: (values) => {
      console.log("Updated Attributes:", values);
      setComponents({
        operation: "update",
        updatedComponent: {
          id,
          type,
          extraAttributes: { ...values },
        },
      });
    },
  });

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg">
      <p className="text-sm text-gray-300">Editing: {formik.values.label}</p>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <label className="mt-4 block">
          Label:
          <input
            type="text"
            name="label"
            value={formik.values.label}
            onChange={formik.handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
          />
          {formik.touched.label && formik.errors.label && (
            <div className="text-red-500 text-sm">{formik.errors.label}</div>
          )}
        </label>

        <label className="mt-4 block">
          Helper Text:
          <input
            type="text"
            name="helperText"
            value={formik.values.helperText}
            onChange={formik.handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
          />
        </label>

        <label className="mt-4 block">
          Placeholder:
          <input
            type="text"
            name="placeHolder"
            value={formik.values.placeHolder}
            onChange={formik.handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
          />
          {formik.touched.placeHolder && formik.errors.placeHolder && (
            <div className="text-red-500 text-sm">
              {formik.errors.placeHolder}
            </div>
          )}
        </label>

        <label className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="required"
            checked={formik.values.required}
            onChange={formik.handleChange}
          />
          Required
        </label>

        <button
          type="submit"
          className="mt-4 w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};
export function FormComponent({ elementInstance, className }) {
  const { label, required, placeHolder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <div className="relative">
        <label htmlFor={label} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          placeholder={placeHolder}
          className="w-full h-24 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-left resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
    </div>
  );
}

// export default TextElement;
