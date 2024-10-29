import ReactDOM from "react-dom/client";
import FormRenderer from "../src/components/FormRenderer";
import { FormConfig } from "../src/types/form.types";

const testConfig: FormConfig = {
  formName: "Test Form",
  fields: [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "pass", type: "password" }
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
