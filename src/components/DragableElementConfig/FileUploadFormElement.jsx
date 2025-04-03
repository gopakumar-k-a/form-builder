import React, { useEffect, useState, useRef } from "react";
import { MdFileUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";

export const extraAttributes = {
  label: "File Upload",
  required: false,
  accept: "", // Allowed file types (e.g., "image/*,application/pdf")
};

export const FileUploadFormElement = {
  type: "fileUpload",
  construct: (id) => ({
    id,
    type: "fileUpload",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,
  propertiesComponent: () => PropertiesComponent,
  formComponent: () => FormComponent,
  designerBtnElement: {
    Icon: () => <MdFileUpload className="h-8 w-8 text-blue-100" />,
    label: "File Upload",
  },
};

function DesignerComponent({ elementInstance, innerRef, className }) {
  console.log('extra attributes ',elementInstance.extraAttributes);
  
  const { label, required, accept } = elementInstance.extraAttributes;

  return (
    <div
      ref={innerRef}
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor={label} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 flex items-center justify-between">
        <span>Upload File</span>
        <MdFileUpload className="text-gray-500" />
      </div>
      {accept && <p className="text-gray-500 text-xs">Accepts: {accept}</p>}
    </div>
  );
}

export const PropertiesComponent = ({ elementInstance }) => {
  const { setComponents } = useCanvas();
  const { extraAttributes, id, type } = elementInstance;

  useEffect(() => {
    console.log("FileUploadFormElement Properties: ", elementInstance);
  }, [elementInstance]);

  const formik = useFormik({
    initialValues: {
      label: extraAttributes.label,
      required: extraAttributes.required || false,
      accept: extraAttributes.accept || "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      accept: Yup.string(),
      required: Yup.boolean(),
    }),
    onSubmit: (values) => {
      console.log("Updated File Upload Attributes:", values);
      setComponents({
        operation: "update",
        updatedComponent: {
          id,
          type,
          extraAttributes: {
            ...extraAttributes,
            label: values.label,
            required: values.required,
            accept: values.accept,
          },
        },
      });
    },
  });

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

        <label className="block">
          Accepted File Types:
          <input
            type="text"
            name="accept"
            value={formik.values.accept}
            onChange={formik.handleChange}
            placeholder="e.g., image/*,application/pdf"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
          />
          <p className="text-gray-500 text-xs mt-1">
            Specify file types the user can upload (comma-separated).
            <br />
            Use standard HTML accept attribute values.
          </p>
        </label>

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
  console.log("extra attributes ", elementInstance.extraAttributes);

  const { label, required, accept } = elementInstance.extraAttributes;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div

      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor={`file-upload-${elementInstance.id}`} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Hidden File Input */}
      <input
        id={`file-upload-${elementInstance.id}`}
        type="file"
        className="hidden"
        accept={accept ? accept.split(",").map(type => `.${type}`).join(",") : "*"}
        onChange={handleFileChange}
      />

      {/* Custom File Upload UI */}
      <div
        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 flex items-center justify-between cursor-pointer"
        onClick={() => document.getElementById(`file-upload-${elementInstance.id}`).click()}
      >
        <span>{selectedFile ? selectedFile.name : "Upload File"}</span>
        <MdFileUpload className="text-gray-500" />
      </div>

      {/* Accepted File Types Info */}
      {accept && <p className="text-gray-500 text-xs">Accepts: {accept}</p>}
    </div>
  );
}

export default FileUploadFormElement;
