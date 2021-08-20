import { ValidationRule, ValidationValueMessage } from "react-hook-form";
import { EMAIL_PATTERN } from "./regex";

export function rules(t: (value: string) => string) {
  return {
    required: {
      value: true,
      message: "Field required",
    },
    emailPattern: {
      value: EMAIL_PATTERN,
      message: "Invalid email",
    },
    minLength: (value: number, message?: string) => ({
      value,
      message: message ? message : `Minimum length required is ${value}`,
    }),
    maxLength: (value: number, message?: string) => ({
      value,
      message: message ? message : `Maximum allowed length is ${value}`,
    }),
  };
}

export interface RulesInterface {
  required: string | boolean | ValidationValueMessage<boolean>;
  min: ValidationRule<React.ReactText>;
  max: ValidationRule<React.ReactText>;
  maxLength: ValidationRule<React.ReactText>;
  minLength: ValidationRule<React.ReactText>;
  pattern: ValidationRule<RegExp>;
  validate: any;
}
