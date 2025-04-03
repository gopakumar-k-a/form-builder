// import { useState } from "react";
import React from "react";
import useFormHandle from "../../hooks/useFormHandler";
import useCanvas from "../../hooks/useCanvas";
import { formElements } from "../DragableElementConfig/FormElements";
function PreviewModal({ trigger, className }) {
  const { isFormPreviewOpen, setFormPreviewOpen } = useFormHandle();
  const { components } = useCanvas();
  const openModal = () => setFormPreviewOpen(true);
  const closeModal = () => setFormPreviewOpen(false);
  if (!components && !components.length) {
    return null;
  }
  return (
    <>
      <div onClick={openModal}>{trigger}</div>

      {/* Modal Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${
          isFormPreviewOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg transition-all dark:bg-slate-900 
        sm:w-[90vw] sm:p-6 md:w-[85vw] lg:max-w-3xl lg:p-8 xl:max-w-4xl 
        ${
          isFormPreviewOpen ? "opacity-100" : "pointer-events-none opacity-0"
        } ${className}`}
      >
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preview</h2>
          <button
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={closeModal}
          >
            ✖<span className="sr-only">Close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-[calc(95vh-8rem)] bg-white overflow-y-auto pr-1 sm:max-h-[calc(90vh-10rem)]">
          {/* modal part start */}
          <div className="space-y-4">
     

            {components && components?.length > 0 && (
              <>
                {components.map((component) => {
                  const FormComponent =
                    formElements[component.type].formComponent();
                  console.log("components are ", component);

                  return (
                    <FormComponent
                      key={component.id}
                      elementInstance={component}
                    />
                  );
                })}

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {/* {Array.from({ length: 20 }).map((_, i) => (
              <p
                key={i}
                className="border-t border-gray-200 pt-4 dark:border-gray-700"
              >
                This is paragraph {i + 1} to demonstrate scrolling behavior.
              </p>
            ))} */}
          </div>
          {/* modal part end */}
        </div>
      </div>
    </>
  );
}

export default PreviewModal;
