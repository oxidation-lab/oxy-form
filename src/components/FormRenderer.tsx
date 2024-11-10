import { FormConfig } from "@/types/form.types";
import React, { useEffect, useState } from "react";

interface FormRendererProps {
  config: FormConfig;
}

interface TemplateComponentProps {
  config: FormConfig;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ config }) => {
  const { formName, fields, template: templateName } = config;

  const [TemplateComponent, setTemplateComponent] = useState<React.FC<TemplateComponentProps> | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const module = await import(
          `./templates/${templateName}/${templateName}.jsx`
        );
        setTemplateComponent(() => module.default as React.FC<TemplateComponentProps>);
        console.log(`Template "${templateName}" loaded successfully!`);
      } catch (error) {
        console.error(`Error loading template "${templateName}":`, error);
      }
    };

    loadTemplate();

  }, [templateName]);

  if (!TemplateComponent) return <div>Loading...</div>;

  return (
    <div className={`form-container`}>
      {/* @ts-ignore */}
      <TemplateComponent config={config} />
    </div>
  );
};


