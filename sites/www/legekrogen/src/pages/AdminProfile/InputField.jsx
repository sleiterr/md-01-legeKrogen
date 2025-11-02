import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, ...rest }) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="mb-1 text-base text-gray-900 ">
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        {...rest}
        className="p-3 h-11 text-sm rounded border border-gray-300 shadow focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="min-h-[3rem] mt-1">
        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </div>
  );
};

export default InputField;
