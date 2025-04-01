import React, { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";

export const extraAttributes = {
  label: "Dropdown Select",
  options: [{ id: 1, value: "Option 1" }, { id: 2, value: "Option 2" }],
  required: false,
};

export const SelectDropdownFormElement = {
  type: "selectDropdown",
  construct: (id) => ({
    id,
    type: "selectDropdown",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,
  propertiesComponent: () => PropertiesComponent,
  formComponent: () => (
    <>
      <div>This is a dropdown select in the form</div>
    </>
  ),
  designerBtnElement: {
    Icon: () => <MdArrowDropDown className="h-8 w-8 text-blue-100" />,
    label: "Dropdown Select",
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
      <div className="relative">
        <select
          disabled
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 appearance-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
          {options.length === 0 && <option>No options</option>}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <MdArrowDropDown className="h-5 w-5" />
        </div>
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
    console.log("SelectDropdownFormElement Properties: ", elementInstance);
  }, [elementInstance]);

  const formik = useFormik({
    initialValues: {
      label: extraAttributes.label,
      required: extraAttributes.required || false,
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      options: Yup.array().min(1, "Please add at least one option to the dropdown."),
    }),
    onSubmit: (values) => {
      console.log("Updated Dropdown Select Attributes:", { ...values, options });
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
      setOptions([...options, { id: Date.now(), value: newOptionValue.trim() }]);
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
  useEffect(() => {
    formik.setValues({ ...formik.values, options: options });
  }, [options, formik.setValues]);


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
           {formik.touched.options && formik.errors.options && (
            <div className="text-red-500 text-sm">{formik.errors.options}</div>
          )}
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

export default SelectDropdownFormElement;