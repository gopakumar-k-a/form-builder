import React, { useEffect } from "react";
import { MdShortText } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";

export const extraAttributes = {
  label: "Input Field",
  helperText: "Enter your text here",
  required: false,
  placeholder: "Type something...",
};

export const InputFormElement = {
  type: "inputField",
  construct: (id) => ({
    id,
    type: "inputField",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,
  propertiesComponent: () => PropertiesComponent,
  formComponent: () => FormComponent,
  designerBtnElement: {
    Icon: () => <MdShortText className="h-8 w-8 text-blue-100" />,
    label: "Inpul Field",
  },
};

function DesignerComponent({ elementInstance, innerRef, className }) {
  const { label, required, placeholder, helperText } =
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
        <input
          type="text"
          readOnly
          disabled
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500"
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
    console.log("InputFormElement Properties: ", elementInstance);
  }, [elementInstance]);

  const formik = useFormik({
    initialValues: extraAttributes,
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      placeholder: Yup.string().required("Placeholder is required"),
      helperText: Yup.string(),
      required: Yup.boolean(),
    }),
    onSubmit: (values) => {
      console.log("Updated Input Attributes:", values);
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
            name="placeholder"
            value={formik.values.placeholder}
            onChange={formik.handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
          />
          {formik.touched.placeholder && formik.errors.placeholder && (
            <div className="text-red-500 text-sm">
              {formik.errors.placeholder}
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

function FormComponent({ elementInstance, className }) {
  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
      >
        <div className="relative">
          <label htmlFor={label} className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
      </div>
    </>
  );
}

export default InputFormElement;
