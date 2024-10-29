import ReactDOM from "react-dom/client";
import FormRenderer from "../src/components/FormRenderer";
import { FormConfig } from "../src/types/form.types";

const testConfig: FormConfig = {
  formName: "Test Form",
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      validation: {
        minLength: 3,
        customMessage: "Username must be at least 3 characters long.",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        customMessage: "Please enter a valid email address.",
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: {
        minLength: 6,
        customMessage: "Password must be at least 6 characters long.",
      },
    },
  ],
};

const App = () => (
  <div style={{ padding: "20px" }}>
    <FormRenderer config={testConfig} />
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
