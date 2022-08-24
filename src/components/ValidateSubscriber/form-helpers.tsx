import { connect, Field, FormikErrors, FormikTouched } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { validateCheckRequired, validateRequiredField } from "./validations";

export const concatClasses = (...args: any[]) => {
  return args.filter((x) => x).join(" ");
};

function createRequiredValidation(requiredProp: string | boolean | undefined) {
  if (!requiredProp) {
    return () => null;
  }

  if (requiredProp === true) {
    return (value: any) => validateRequiredField(value);
  }

  return (value: any) => validateRequiredField(value, requiredProp);
}

export function combineValidations(
  ...validateFunctions: [
    ((value: any) => true | string | null) | undefined | false | null
  ]
): (value: any) => true | string | null {
  return (value) => {
    for (let validate of validateFunctions) {
      const result = validate && validate(value);
      if (result) {
        return result;
      }
    }
    return null;
  };
}

const Message = ({ message }: { message: any }) => {
  const intl = useIntl();
  return React.isValidElement(message) ? (
    message
  ) : (
    // assuming string
    // TODO: also consider array of errors, and parameters for localization message placeholders
    <p>{intl.formatMessage({ id: message })}</p>
  );
};

interface FieldItemProp {
  className: string;
  fieldName: string;
  children?: React.ReactNode;
  withErrors?: boolean;
  formik?: { errors: {}; touched: {}; submitCount?: () => void };
}

export interface FormikProp {
  errors?: FormikErrors<{ [field: string]: string }>;
  touched?: FormikTouched<{ [field: string]: any }>;
  submitCount?: number;
}

export const FieldItem = connect(
  ({
    className,
    fieldName,
    children,
    withErrors = true,
    formik,
  }: FieldItemProp & FormikProp) => {
    const { errors = {}, touched = {}, submitCount } = formik ?? {};
    return (
      <li
        className={concatClasses(
          className,
          withErrors &&
            submitCount &&
            touched[fieldName as keyof typeof touched] &&
            errors[fieldName as keyof typeof errors]
            ? "error"
            : ""
        )}
      >
        {children}
        {/* Boolean errors will not have message */}
        {withErrors &&
        submitCount &&
        touched[fieldName as keyof typeof touched] &&
        errors[fieldName as keyof typeof errors] ? (
          <div className="dp-message dp-error-form">
            <Message message={errors[fieldName as keyof typeof errors]} />
          </div>
        ) : null}
      </li>
    );
  }
);

interface InputFieldItemProp {
  className: string;
  fieldName: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  withNameValidation?: string;
  minLength?: {
    min: number;
    errorMessageKey: string;
  };
  rest?: any[];
}

export const InputFieldItem = ({
  className,
  fieldName,
  label,
  type,
  placeholder,
  required,
  withNameValidation,
  minLength,
  rest,
}: InputFieldItemProp) => (
  <FieldItem
    className={concatClasses("field-item", className)}
    fieldName={fieldName}
  >
    <label htmlFor={fieldName}>{label}</label>
    <Field
      type={type}
      name={fieldName}
      id={fieldName}
      placeholder={placeholder}
      validate={combineValidations(createRequiredValidation(required))}
      {...rest}
    />
  </FieldItem>
);

interface CheckboxFieldItemProp {
  className: string;
  fieldName: string;
  label: string;
  checkRequired?: string;
  id: string;
  value: string;
  onChange?: () => void;
  onClick?: () => void;
  withErrors: boolean;
}
export const CheckboxFieldItem = ({
  className,
  fieldName,
  label,
  checkRequired,
  id,
  value,
  onChange,
  withErrors = true,
}: CheckboxFieldItemProp) => (
  <FieldItem
    className={concatClasses("field-item field-item__checkbox", className)}
    fieldName={fieldName}
    withErrors={withErrors}
  >
    <Field
      type="checkbox"
      name={fieldName}
      id={id || fieldName}
      validate={(value: any) => checkRequired && validateCheckRequired(value)}
      value={value}
      onClick={onChange}
    />
    <span className="checkmark" />
    <label htmlFor={id || fieldName}> {label}</label>
  </FieldItem>
);

export const FieldGroup = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => <ul className={concatClasses("field-group", className)}>{children}</ul>;
