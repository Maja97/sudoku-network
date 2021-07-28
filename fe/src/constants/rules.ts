import { ValidationRule, ValidationValueMessage } from "react-hook-form";

export function rules(t: (value: string) => string) {
  return {
    required: {
      value: true,
      message: "Field required",
    },
    emailPattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email",
    },
    minLength: (value: number, message?: string) => ({
      value,
      message: message ? "Min length translation" : `Min length is ${value}`,
    }),
    maxLength: (value: number, message?: string) => ({
      value,
      message: message ? "Max length translation" : `Max length is ${value}`,
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
