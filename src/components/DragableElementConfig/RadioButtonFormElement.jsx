import React, { useEffect, useState } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";
export const extraAttributes = {
  label: "Radio Group",
  options: [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
  ],
  required: false,
};

export const RadioButtonFormElement = {
  type: "radioGroup",
  construct: (id) => ({
    id,
    type: "radioGroup",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,
  propertiesComponent: () => PropertiesComponent,
  formComponent: () => FormComponent,
  designerBtnElement: {
    Icon: () => <MdRadioButtonChecked className="h-8 w-8 text-blue-100" />,
    label: "Radio Buttons",
  },
};

function DesignerComponent({ elementInstance, innerRef, className }) {
  const { label, options, required } = elementInstance.extraAttributes;

  return (
    <div
      ref={innerRef}
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor={label} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-1">
        {/* {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <MdRadioButtonUnchecked className="mr-2" />
            <span>{option.value}</span>
          </div>
        ))} */}
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center ${
              option.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="radio"
              className="mr-2"
              value={option.id}
              disabled={true}
            />
            <label
              className={`${
                option.disabled ? "cursor-not-allowed" : "cursor-default"
              }`}
            >
              <span>{option.value}</span>
            </label>
          </div>
        ))}
        {options.length === 0 && (
          <span className="text-gray-500 text-xs">No options added</span>
        )}
      </div>
    </div>
  );
}

export const PropertiesComponent = ({ elementInstance }) => {
  const { setComponents } = useCanvas();
  const { extraAttributes, id, type } = elementInstance;
  const [options, setOptions] = useState([...extraAttributes.options]);
  const [newOptionValue, setNewOptionValue] = useState("");

  useEffect(() => {
    console.log("RadioButtonFormElement Properties: ", elementInstance);
  }, [elementInstance]);

  const formik = useFormik({
    initialValues: {
      label: extraAttributes.label,
      required: extraAttributes.required || false,
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
    }),
    onSubmit: (values) => {
      console.log("Updated Radio Button Attributes:", { ...values, options });
      setComponents({
        operation: "update",
        updatedComponent: {
          id,
          type,
          extraAttributes: {
            ...extraAttributes,
            label: values.label,
            required: values.required,
            options: options.map((opt, index) => ({ ...opt, id: index + 1 })), // Ensure unique IDs
          },
        },
      });
    },
  });

  const handleAddOption = () => {
    if (newOptionValue.trim()) {
      setOptions([
        ...options,
        { id: Date.now(), value: newOptionValue.trim() },
      ]);
      setNewOptionValue("");
    }
  };

  const handleRemoveOption = (optionId) => {
    setOptions(options.filter((option) => option.id !== optionId));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = value;
    setOptions(updatedOptions);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg">
      <p className="text-sm text-gray-300">Editing: {formik.values.label}</p>
      <form onSubmit={formik.handleSubmit} className="mt-4 flex flex-col gap-4">
        <label className="block">
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

        <div>
          <label className="block">Options:</label>
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(option.id)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="New Option"
              value={newOptionValue}
              onChange={(e) => setNewOptionValue(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2">
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
  const { label, options, required } = elementInstance.extraAttributes;
console.log('options are ',options);
const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor={label} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-1">
        {/* {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <MdRadioButtonUnchecked className="mr-2" />
            <span>{option.value}</span>
          </div>
        ))} */}
 {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center ${
            option.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <input
            type="radio"
            name="options"
            className="mr-2"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            disabled={option.disabled}
          />
          <label
            className={`${
              option.disabled ? "cursor-not-allowed" : "cursor-default"
            }`}
          >
            <span>{option.value}</span>
          </label>
        </div>
      ))}
        {options.length === 0 && (
          <span className="text-gray-500 text-xs">No options added</span>
        )}
      </div>
    </div>
  );
}

export default RadioButtonFormElement;
