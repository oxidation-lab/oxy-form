import React, { useState } from 'react';
import { FieldConfig, FormConfig } from '../../types/form.types';

interface TemplateProps {
  config: FormConfig;
}

const BasicTemplate: React.FC<TemplateProps> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? [...(prevData[name] || []), value] : (prevData[name] || []).filter((v: string) => v !== value),
      }));
    } else if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const validateField = (field: FieldConfig, value: any) => {
    const fieldErrors: string[] = [];

    if (field.required && !value) {
      fieldErrors.push(`${field.label} is required`);
    }

    if (field.validation?.pattern && !field.validation.pattern.test(value)) {
      fieldErrors.push(field.validation.customMessage || `${field.label} is invalid`);
    }

    if (field.validation?.minLength && value.length < field.validation.minLength) {
      fieldErrors.push(field.validation.customMessage || `${field.label} is too short`);
    }

    if (field.validation?.maxLength && value.length > field.validation.maxLength) {
      fieldErrors.push(field.validation.customMessage || `${field.label} is too long`);
    }

    if (field.type === "number" && isNaN(Number(value))) {
      fieldErrors.push(`${field.label} must be a number`);
    }

    if (field.type === "number") {
      if (field.validation?.minValue !== undefined && Number(value) < field.validation.minValue) {
        fieldErrors.push(`${field.label} should be at least ${field.validation.minValue}`);
      }
      if (field.validation?.maxValue !== undefined && Number(value) > field.validation.maxValue) {
        fieldErrors.push(`${field.label} should be no more than ${field.validation.maxValue}`);
      }
    }

    return fieldErrors;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    config.fields.forEach((field) => {
      const value = formData[field.name] || "";
      const fieldErrors = validateField(field, value);

      if (fieldErrors.length > 0) {
        newErrors[field.name] = fieldErrors.join(' ');
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
        <h2 className="text-lg font-semibold text-center mb-4">{config.formName}</h2>
        {config.fields.map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
              {field.label}
            </label>
            {field.type === 'radio' && field.options ? (
              field.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    checked={formData[field.name] === option}
                    onChange={handleChange}
                  />{' '}
                  {option}
                </label>
              ))
            ) : field.type === 'checkbox' && field.options ? (
              field.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option}
                    checked={(formData[field.name] || []).includes(option)}
                    onChange={handleChange}
                  />{' '}
                  {option}
                </label>
              ))
            ) : (
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
            )}
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
    </div>
  );
};

export default BasicTemplate;
