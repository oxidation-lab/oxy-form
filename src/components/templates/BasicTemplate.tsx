import React, { useState } from 'react';
import { FormConfig } from '../../types/form.types';

interface TemplateProps {
  config: FormConfig;
}

const BasicTemplate: React.FC<TemplateProps> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    config.fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.validation) {
        if (field.validation.minLength && value.length < field.validation.minLength) {
          newErrors[field.name] = field.validation.customMessage || `${field.label} is too short`;
        }
        if (field.validation.pattern && !field.validation.pattern.test(value)) {
          newErrors[field.name] = field.validation.customMessage || `${field.label} is invalid`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
    } else {
      console.log("Validation failed. Check errors.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field.name] ? 'border-red-500' : ''}`}
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs italic">{errors[field.name]}</p>
            )}
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
};

export default BasicTemplate;
