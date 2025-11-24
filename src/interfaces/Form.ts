export type Form = {
  row: Row[];
};

export interface Row {
  row_index: number;
  col: Col[];
}

export interface Col {
  col_index: number;
  field: Field;
}

export interface FieldValidations {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
}
export interface Field {
  HtmlTag: "input" | "textarea" | "select" | "button";
  Type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "radio"
    | "checkbox"
    | "select";
  name: string;
  label?: string;
  placeholder?: string;
  options?: string[];
  validations?: FieldValidations;
}
