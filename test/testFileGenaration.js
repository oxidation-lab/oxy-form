const fs = require('fs');
const path = require('path');

const createFileFromTemplate = (template, config, outputPath) => {

  const templatePath = path.resolve(`./src/components/templates/${template}.tsx`);
  const templateString = fs.readFileSync(templatePath, 'utf8');

  const configString = `const config = ${JSON.stringify(config, null, 2)};`;
  const types = `
type FieldValidation = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customMessage?: string;
  minValue?: number;
  maxValue?: number;
};

type RadioGroup = {
  options: string[];
  layout: "inline" | "newline";
  name: string;
};

type FieldConfig = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  icon?: string;
  validation?: FieldValidation;
  groups?: RadioGroup[];
};

type FormConfig = {
  fields: FieldConfig[];
  template?: React.FC<{ config: FormConfig }>;
  formName: string;
};`

  let fileContent = templateString.replace(
    /import { FieldConfig, FormConfig } from ['"].+['"];/g,
    types
  );
  fileContent = fileContent.replace(/{\s*config\s*}/g, '');
  fileContent = fileContent.replace(/\/\/FORM_CONFIG_HERE/g, configString);
  const fullPath = path.resolve(outputPath);

  fs.writeFileSync(fullPath, fileContent, 'utf8');
  console.log(`File created successfully at ${fullPath}`);
};

const template = 'BasicTemplate';
const config = {
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
      required: true,
      placeholder: "Enter your email",
      validation: {
        pattern: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`,
        customMessage: "Please enter a valid email address",
      },
    },
  ],
};
const outputPath = './src/components/GeneratedComponent.tsx';


createFileFromTemplate(template, config, outputPath);









