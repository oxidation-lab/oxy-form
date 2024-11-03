import React, { useState } from 'react';
import { FieldConfig, FormConfig } from '../../../types/form.types';

interface TemplateProps {
  config: FormConfig;
}

const BasicTemplate: React.FC<TemplateProps> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});


  //FORM_CONFIG_HERE



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const renderRadioGroups = (field: FieldConfig) => (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.label}
      </label>
      {field.groups?.map((group: any, index: number) => (
        <div key={index} className="mb-4">

          <div className={`flex ${group.layout === "inline" ? "flex-row" : "flex-col"} gap-4`}>
            {group.options.map((option: any, idx: number) => (
              <label key={idx} className="text-gray-700 text-sm">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {errors[field.name] && (
            <p className="text-red-500 text-xs italic">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-center mb-4">{config.formName}</h2>
        {config.fields.map((field: any, index: number) => (
          <div key={index} className="mb-4">
            {field.type === "radio" ? (
              renderRadioGroups(field)
            ) : (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
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
              </>
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
