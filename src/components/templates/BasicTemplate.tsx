import React from 'react';
import { FormConfig } from '../../types/form.types';

interface TemplateProps {
  config: FormConfig;
}

const BasicTemplate: React.FC<TemplateProps> = ({ config }) => (
  <div className="w-full max-w-xs mx-auto">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-semibold mb-4">{config.formName}</h2>
      {config.fields.map((field, index) => (
        <div className="mb-4" key={index}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={field.type}
            id={field.name}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder || ""}
          />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;{new Date().getFullYear()} Your Company. All rights reserved.
    </p>
  </div>
);

export default BasicTemplate;
