import { useState } from 'react';

const BasicTemplate = ({ config }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const renderRadioGroups = (field) => (
    <>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#4a4a4a' }}>
        {field.label}
      </label>
      {field.groups?.map((group, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: group.layout === "inline" ? "row" : "column", gap: '16px' }}>
            {group.options.map((option, idx) => (
              <label key={idx} style={{ fontSize: '14px', color: '#4a4a4a' }}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            ))}
          </div>
          {errors[field.name] && (
            <p style={{ color: '#f56565', fontSize: '12px', fontStyle: 'italic' }}>{errors[field.name]}</p>
          )}
        </div>
      ))}
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: 'auto' }}>
      <form style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '24px 32px',
        marginBottom: '16px'
      }} onSubmit={handleSubmit}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>
          {config.formName} JS
        </h2>
        {config.fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {field.type === "radio" ? (
              renderRadioGroups(field)
            ) : (
              <>
                <label
                  style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#4a4a4a' }}
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  style={{
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
                    border: '1px solid',
                    borderRadius: '4px',
                    width: '100%',
                    padding: '8px 12px',
                    color: '#4a4a4a',
                    fontSize: '14px',
                    outline: 'none',
                    ...(errors[field.name] && { borderColor: '#f56565' })
                  }}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder || ""}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
                {errors[field.name] && (
                  <p style={{ color: '#f56565', fontSize: '12px', fontStyle: 'italic' }}>{errors[field.name]}</p>
                )}
              </>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            style={{
              backgroundColor: '#3182ce',
              color: 'white',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2b6cb0'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
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
