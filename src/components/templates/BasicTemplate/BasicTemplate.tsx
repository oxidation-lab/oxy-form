import React, { useState } from 'react';
import { FieldConfig, FormConfig } from '../../../types/form.types';

interface TemplateProps {
  config: FormConfig;
  styling: any;
}

const BasicTemplate: React.FC<TemplateProps> = ({ config, styling }) => { //TODO: dont forgot to update the logic of the generatefile function
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});





  //FORM_CONFIG_HERE






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

    if (field.type === "number") {
      if (isNaN(Number(value))) {
        fieldErrors.push(`${field.label} must be a number`);
      } else {
        if (field.validation?.minValue !== undefined && Number(value) < field.validation.minValue) {
          fieldErrors.push(`${field.label} should be at least ${field.validation.minValue}`);
        }
        if (field.validation?.maxValue !== undefined && Number(value) > field.validation.maxValue) {
          fieldErrors.push(`${field.label} should be at most ${field.validation.maxValue}`);
        }
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
        newErrors[field.name] = fieldErrors.join(" ");
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const renderRadioGroups = (field: FieldConfig) => (
    <>
      <label className={styling === 'tailwind' ? "block text-gray-700 text-sm font-bold mb-2" : ""}>
        {field.label}
      </label>
      {field.groups?.map((group, index) => (
        <div key={index} className={styling === 'tailwind' ? "mb-4" : ""}>
          <div className={`flex ${styling === 'tailwind' && group.layout === "inline" ? "flex-row gap-4" : "flex-col gap-4"}`}>
            {group.options.map((option, idx) => (
              <label key={idx} className={styling === 'tailwind' ? "text-gray-700 text-sm" : ""}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={handleChange}
                  className={styling === 'tailwind' ? "mr-2" : ""}
                />
                {option}
              </label>
            ))}
          </div>
          {errors[field.name] && (
            <p className={styling === 'tailwind' ? "text-red-500 text-xs italic" : ""}>{errors[field.name]}</p>
          )}
        </div>
      ))}
    </>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Validation failed. Check errors.");
    }
  };

  return (
    <div className={styling === 'tailwind' ? "w-full max-w-xs mx-auto" : ""}>
      <form className={styling === 'tailwind' ? "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" : ""} onSubmit={handleSubmit}>
        <h2 className={styling === 'tailwind' ? "text-lg font-semibold text-center mb-4" : ""}>{config.formName}</h2>
        {config.fields.map((field, index) => (
          <div key={index} className={styling === 'tailwind' ? "mb-4" : ""}>
            {field.type === "radio" ? (
              renderRadioGroups(field)
            ) : (
              <>
                <label className={styling === 'tailwind' ? "block text-gray-700 text-sm font-bold mb-2" : ""} htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  className={
                    styling === 'tailwind'
                      ? `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field.name] ? 'border-red-500' : ''}`
                      : ""
                  }
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder || ""}
                  value={String(formData[field.name] || "")}
                  onChange={handleChange}
                />
                {errors[field.name] && (
                  <p className={styling === 'tailwind' ? "text-red-500 text-xs italic" : ""}>{errors[field.name]}</p>
                )}
              </>
            )}
          </div>
        ))}
        <div className={styling === 'tailwind' ? "flex items-center justify-between" : ""}>
          <button
            className={styling === 'tailwind' ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : ""}
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
