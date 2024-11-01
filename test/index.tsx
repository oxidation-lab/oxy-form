import ReactDOM from "react-dom/client";
import FormRenderer from "../src/components/FormRenderer";
import { FormConfig } from "../src/types/form.types";

const formConfig: FormConfig = {
  formName: "Sample Form",
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
      name: "age",
      type: "number",
      label: "Age",
      required: true,
      placeholder: "Enter your age",
      validation: {
        minValue: 18,
        maxValue: 99,
      },
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      options: ["Male", "Female", "Other"],
    },
    {
      name: "hobbies",
      type: "checkbox",
      label: "Hobbies",
      options: ["Reading", "Traveling", "Cooking", "Sports"],
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      required: true,
      placeholder: "Enter your email",
      validation: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        customMessage: "Please enter a valid email address",
      },
    },
  ],
};
const App = () => (
  <div style={{ padding: "20px" }}>
    <FormRenderer config={formConfig} />
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
