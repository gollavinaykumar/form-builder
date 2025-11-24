//VALIDATION TYPES

export interface FieldValidations {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

//  BASE FIELD

export interface BaseField {
  label?: string;
  name: string;
  validations?: FieldValidations;
}

//INPUT: TEXT

export interface InputTextField extends BaseField {
  HtmlTag: "input";
  Type: "text";
  placeholder?: string;
  options?: never;
}

export function createTextInput(
  name: string,
  label?: string,
  placeholder?: string,
  validations?: FieldValidations
): InputTextField {
  return {
    HtmlTag: "input",
    Type: "text",
    name,
    label,
    placeholder,
    validations,
  };
}

// INPUT: EMAIL

export interface InputEmailField extends BaseField {
  HtmlTag: "input";
  Type: "email";
  placeholder?: string;
  options?: never;
}

export function createEmailInput(
  name: string,
  label?: string,
  placeholder?: string,
  validations?: FieldValidations
): InputEmailField {
  return {
    HtmlTag: "input",
    Type: "email",
    name,
    label,
    placeholder,
    validations,
  };
}

//INPUT: PASSWORD

export interface InputPasswordField extends BaseField {
  HtmlTag: "input";
  Type: "password";
  placeholder?: string;
  options?: never;
}

export function createPasswordInput(
  name: string,
  label?: string,
  placeholder?: string,
  validations?: FieldValidations
): InputPasswordField {
  return {
    HtmlTag: "input",
    Type: "password",
    name,
    label,
    placeholder,
    validations,
  };
}

//INPUT: NUMBER

export interface InputNumberField extends BaseField {
  HtmlTag: "input";
  Type: "number";
  placeholder?: string;
  options?: never;
}

export function createNumberInput(
  name: string,
  label?: string,
  placeholder?: string,
  validations?: FieldValidations
): InputNumberField {
  return {
    HtmlTag: "input",
    Type: "number",
    name,
    label,
    placeholder,
    validations,
  };
}

// SELECT FIELD

export interface SelectField extends BaseField {
  HtmlTag: "select";
  Type: "select";
  options: string[];
  placeholder?: never;
}

export function createSelectField(
  name: string,
  options: string[],
  label?: string,
  validations?: FieldValidations
): SelectField {
  return {
    HtmlTag: "select",
    Type: "select",
    name,
    label,
    options,
    validations,
  };
}

//TEXTAREA

export interface TextareaField extends BaseField {
  HtmlTag: "textarea";
  Type: "text";
  placeholder?: string;
  options?: never;
}

export function createTextarea(
  name: string,
  label?: string,
  placeholder?: string,
  validations?: FieldValidations
): TextareaField {
  return {
    HtmlTag: "textarea",
    Type: "text",
    name,
    label,
    placeholder,
    validations,
  };
}

//BUTTON

export interface ButtonField extends BaseField {
  HtmlTag: "button";
  Type: "text";
  placeholder?: never;
  options?: never;
}

export function createButton(name: string, label?: string): ButtonField {
  return {
    HtmlTag: "button",
    Type: "text",
    name,
    label,
  };
}

//  CHECKBOX FIELD

export interface CheckboxField extends BaseField {
  HtmlTag: "input";
  Type: "checkbox";
  options: string[];
  placeholder?: never;
}

export function createCheckboxField(
  name: string,
  options: string[],
  label?: string,
  validations?: FieldValidations
): CheckboxField {
  return {
    HtmlTag: "input",
    Type: "checkbox",
    name,
    label,
    options,
    validations,
  };
}

//RADIO FIELD

export interface RadioField extends BaseField {
  HtmlTag: "input";
  Type: "radio";
  options: string[];
  placeholder?: never;
}

export function createRadioField(
  name: string,
  options: string[],
  label?: string,
  validations?: FieldValidations
): RadioField {
  return {
    HtmlTag: "input",
    Type: "radio",
    name,
    label,
    options,
    validations,
  };
}

// UNION TYPE

export type Field =
  | InputTextField
  | InputEmailField
  | InputPasswordField
  | InputNumberField
  | SelectField
  | TextareaField
  | ButtonField
  | CheckboxField
  | RadioField;
