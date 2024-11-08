# 🛠️ Form Renderer

## 📜 Description

oxy-form is a powerful and flexible library designed to dynamically render forms based on JSON configurations. It provides a set of customizable templates, making it easy to create forms that meet your needs without extensive coding. This project aims to streamline the process of form generation, validation, and submission in web applications.

## 🚀 Features

- **Dynamic Form Rendering**: Render forms using JSON configurations.
- **Customizable Templates**: Easily switch between different templates to match your application's style.
- **Field Validation**: Built-in utilities for validating form fields based on patterns.
- **TypeScript Support**: Strongly typed components and utilities for better development experience.

## 📦 Installation

```bash
npm install @oxidation-lab/oxy-form
```

## 🎨 Templates

The library provides a set of templates that can be used to render forms. You can easily switch between templates by specifying the template name in the configuration.

### BasicTemplate (Default)


The default template is a simple form layout with basic styling. It is suitable for most applications.

```jsx
import ReactDOM from "react-dom/client";
import { FormRenderer } from "@oxidation-lab/oxy-form";

const formConfig = {
  formName: "Multi-Category Radio Form",
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      required: true,
      placeholder: "Enter your username",
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: "preferences",
      label: "Preferences",
      type: "radio",
      required: true,
      groups: [
        {
          name: "operatingSystem",
          options: ["Windows", "macOS", "Linux"],
          layout: "inline",
        },
        {
          name: "languageProficiency",
          options: ["Beginner", "Intermediate", "Advanced"],
          layout: "newline",
        },
      ],
    },
  ],
  stylingConfig: {
    language: "js",
    styling: "external",
  },
  template: "BasicTemplate",
};


const App = () => (
  <div style={{ padding: "20px", marginTop: "300px" }}>
    <FormRenderer config={formConfig} />
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
```



