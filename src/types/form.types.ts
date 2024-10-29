type FieldConfig = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
}

type FormConfig = {
  fields: FieldConfig[];
  template?: React.FC<{ config: FormConfig }>;
  formName: string;
}

export { FormConfig };


