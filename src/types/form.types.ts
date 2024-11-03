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

type StylingConfig = {
  language: "js" | "ts";
  styling: "tailwind" | "inline" | "styled" | "external";
  cssFilePath?: string;
};

type FormConfig = {
  fields: FieldConfig[];
  template: string;
  formName: string;
  stylingConfig: StylingConfig;
};

export { FieldConfig, FieldValidation, FormConfig, RadioGroup, StylingConfig };
