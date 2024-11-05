import ReactDOM from "react-dom/client";
// @ts-ignore
import { FormRenderer } from "../src/components/FormRenderer";
import { FormConfig } from "../src/types/form.types";

const formConfig: FormConfig = {
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
    {
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      validation: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        customMessage: "Please enter a valid email address",
      },
    },
  ],
  stylingConfig: {
    language: "ts",
    styling: "tailwind",
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
