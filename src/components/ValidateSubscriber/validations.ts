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

export function validateRequiredField(
  value: any,
  commonErrorKey: true | string = "validation_messages.error_required_field"
): true | string | null {
  if (value === undefined || value === null || value === "") {
    return commonErrorKey;
  }

  return null;
}

export function validateCheckRequired(
  value: any,
  commonErrorKey: true | string = true
): true | string | null {
  if (!value) {
    return commonErrorKey;
  }

  return null;
}
