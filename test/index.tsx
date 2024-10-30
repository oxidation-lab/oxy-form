import ReactDOM from "react-dom/client";
import FormRenderer from "../src/components/FormRenderer";
import { FormConfig } from "../src/types/form.types";
import regexPatterns from "../src/utils/regexPatterns";

const testConfig: FormConfig = {
  formName: "Test Form",
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      validation: {
        minLength: 3,
        customMessage: "Username must be between 3 and 12 characters long.",
        pattern: regexPatterns.username(3, 12),
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: {
        pattern: regexPatterns.email,
        customMessage: "Please enter a valid email address.",
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: {
        customMessage:
          "Password must be at least 8 characters long, contain a number, an uppercase letter, and a special character.",
        pattern: regexPatterns.password(),
      },
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      validation: {
        customMessage: "Please enter a valid 8-digit phone number.",
        pattern: regexPatterns.phoneNumber(8, false),
      },
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      validation: {
        customMessage: "Please enter a valid postal code.",
        pattern: regexPatterns.postalCode,
      },
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      validation: {
        customMessage: "Please enter a valid URL.",
        pattern: regexPatterns.url,
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
