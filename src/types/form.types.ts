type FieldConfig = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  icon?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customMessage?: string;
  };
}

type FormConfig = {
  fields: FieldConfig[];
  template?: React.FC<{ config: FormConfig }>;
  formName: string;
}

export { FieldConfig, FormConfig };


