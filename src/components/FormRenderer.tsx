import React from "react";
import { FormConfig } from "../types/form.types";
import BasicTemplate from "./templates/BasicTemplate";

interface FormRendererProps {
  config: FormConfig;
}

const FormRenderer: React.FC<FormRendererProps> = ({ config }) => {
  const { formName, fields, template: TemplateComponent = BasicTemplate } = config;

  return (
    <div>
      <TemplateComponent config={config} />
    </div>
  );
};

export default FormRenderer;
