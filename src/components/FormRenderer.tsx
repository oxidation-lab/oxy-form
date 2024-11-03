import { FormConfig } from "@/types/form.types";
import React, { useEffect, useState } from "react";

interface FormRendererProps {
  config: FormConfig;
}

interface TemplateComponentProps {
  config: FormConfig;
}

const FormRenderer: React.FC<FormRendererProps> = ({ config }) => {
  const { formName, fields, template: templateName } = config;
  const { language, styling } = config.stylingConfig;

  const [TemplateComponent, setTemplateComponent] = useState<React.FC<TemplateComponentProps> | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const module = await import(
          `@/components/templates/${templateName}/${templateName}.${language === "ts" ? "tsx" : "jsx"}`
        );
        setTemplateComponent(() => module.default as React.FC<TemplateComponentProps>);
      } catch (error) {
        console.error(`Error loading template "${templateName}":`, error);
      }
    };

    loadTemplate();

    if (styling === "external") {
      import(`@/components/templates/${templateName}/${templateName}.css`).catch((error) =>
        console.error("Error loading external CSS:", error)
      );
    }
  }, [templateName, language, styling]);

  if (!TemplateComponent) return <div>Loading...</div>;

  return (
    <div className={`form-container ${styling === "tailwind" ? "tailwind-styles" : ""}`}>
      <TemplateComponent config={config} />
    </div>
  );
};

export default FormRenderer;
