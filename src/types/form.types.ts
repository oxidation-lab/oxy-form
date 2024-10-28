type FieldConfig = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  pattern?: string;
}

type FormConfig = {
  fields: FieldConfig[];
  template?: string;
  formName: string;
}

export { FormConfig };


