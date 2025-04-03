import React, { useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCanvas from "../../hooks/useCanvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const extraAttributes = {
  label: "Date Range",
  minDate: null,
  maxDate: null,
  required: false,
};

export const DatePickerFormElement = {
  type: "datePicker",
  construct: (id) => ({
    id,
    type: "datePicker",
    extraAttributes,
  }),
  designerComponent: () => DesignerComponent,
  propertiesComponent: () => PropertiesComponent,
  formComponent: () => FormComponent,
  designerBtnElement: {
    Icon: () => <BsCalendarDate className="h-8 w-8 text-blue-100" />,
    label: "Date Picker",
  },
};

function DesignerComponent({ elementInstance, innerRef, className }) {
  console.log("extra attributes are ", elementInstance.extraAttributes);

  const { label, required, helperText } = elementInstance.extraAttributes;

  // Convert ISO date strings to JavaScript Date objects
  // const minDateValue = minDate ? new Date(minDate) : null;
  // const maxDateValue = maxDate ? new Date(maxDate) : null;

  // const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div
      ref={innerRef}
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor="date-picker" className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Date Picker */}
      <div className="relative w-full">
        {/* <DatePicker
            id="date-picker"
            // selected={selectedDate}
            // onChange={(date) => setSelectedDate(date)}
            // minDate={minDateValue}
            // maxDate={maxDateValue}
            disabled 
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            placeholderText="Select Date"
          /> */}
        <input
          type="date"
          id="date-picker"
          // selected={selectedDate}
          // onChange={(date) => setSelectedDate(date)}
          // minDate={minDateValue}
          // maxDate={maxDateValue}
          disabled
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          placeholderText="Select Date"
        />
        <BsCalendarDate className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Helper Text */}
      {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
    </div>
  );
}

export const PropertiesComponent = ({ elementInstance }) => {
  const { setComponents } = useCanvas();
  const { extraAttributes, id, type } = elementInstance;
  const [initialMinDate] = useState(
    extraAttributes.minDate ? new Date(extraAttributes.minDate) : null
  );
  const [initialMaxDate] = useState(
    extraAttributes.maxDate ? new Date(extraAttributes.maxDate) : null
  );

  useEffect(() => {
    console.log("DateRangePickerFormElement Properties: ", elementInstance);
  }, [elementInstance]);

  const formik = useFormik({
    initialValues: {
      label: extraAttributes.label,
      required: extraAttributes.required || false,
      minDate: initialMinDate,
      maxDate: initialMaxDate,
    },
    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      maxDate: Yup.date()
        .nullable()
        .min(Yup.ref("minDate"), "End Date cannot be before Start Date"),
    }),
    onSubmit: (values) => {
      console.log("Updated Date Range Picker Attributes:", values);
      setComponents({
        operation: "update",
        updatedComponent: {
          id,
          type,
          extraAttributes: {
            ...extraAttributes,
            label: values.label,
            required: values.required,
            minDate: values.minDate ? values.minDate.toISOString() : null,
            maxDate: values.maxDate ? values.maxDate.toISOString() : null,
          },
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

        <div>
          <label className="block">Min Date:</label>
          <DatePicker
            selected={formik.values.minDate}
            onChange={(date) => formik.setFieldValue("minDate", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Min Date"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1 text-white"
          />
          {formik.touched.minDate && formik.errors.minDate && (
            <div className="text-red-500 text-sm">{formik.errors.minDate}</div>
          )}
        </div>

        <div>
          <label className="block">Max Date:</label>
          <DatePicker
            selected={formik.values.maxDate}
            onChange={(date) => formik.setFieldValue("maxDate", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Max Date"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1 text-white"
          />
          {formik.touched.maxDate && formik.errors.maxDate && (
            <div className="text-red-500 text-sm">{formik.errors.maxDate}</div>
          )}
        </div>

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
  console.log("extra attributes are ", elementInstance.extraAttributes);

  const { label, required, helperText, minDate, maxDate } =
    elementInstance.extraAttributes;

  // Convert ISO date strings to JavaScript Date objects
  const minDateValue = minDate ? new Date(minDate) : null;
  const maxDateValue = maxDate ? new Date(maxDate) : null;

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div
      className={`flex flex-col gap-2 w-full text-black p-3 border rounded-md transition-all ${className}`}
    >
      <label htmlFor="date-picker" className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Date Picker */}
      <div className="relative w-full">
        <input
          type="date"
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={minDateValue}
          maxDate={maxDateValue}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          placeholderText="Select Date"
        />
        {/* <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={minDateValue}
          maxDate={maxDateValue}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          placeholderText="Select Date"
        /> */}
        <BsCalendarDate className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Helper Text */}
      {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
    </div>
  );
}

export default DatePickerFormElement;
