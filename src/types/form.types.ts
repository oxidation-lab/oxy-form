type FieldValidation = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customMessage?: string;
  minValue?: number;
  maxValue?: number;
};

type FieldConfig = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  icon?: string;
  validation?: FieldValidation;
};

type FormConfig = {
  fields: FieldConfig[];
  template?: React.FC<{ config: FormConfig }>;
  formName: string;
};

export { FieldConfig, FieldValidation, FormConfig };
