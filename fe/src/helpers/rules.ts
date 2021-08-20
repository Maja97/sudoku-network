import { rules, RulesInterface } from "../constants/rules";

export const PASSWORD_MIN_LENGTH = 5;
export const USERNAME_MIN_LENGTH = 6;
export const NAME_MIN_LENGTH = 2;
export const MAX_LENGTH = 100;
export const MAX_SUDOKU_NAME_LENGTH = 50;

export interface SaveSudoku {
  rules: (t: (value: string) => string) => {
    name: Partial<RulesInterface> | undefined;
  };
}

export interface Login {
  rules: (t: (value: string) => string) => {
    email: Partial<RulesInterface> | undefined;
    password: Partial<RulesInterface> | undefined;
  };
}

export interface Register {
  rules: (t: (value: string) => string) => {
    email: Partial<RulesInterface> | undefined;
    password: Partial<RulesInterface> | undefined;
    firstName: Partial<RulesInterface> | undefined;
    lastName: Partial<RulesInterface> | undefined;
    username: Partial<RulesInterface> | undefined;
  };
}

export const saveSudokuRules: SaveSudoku = {
  rules: (t: (value: string) => string) => ({
    name: {
      maxLength: rules(t).maxLength(
        MAX_SUDOKU_NAME_LENGTH,
        `Maximum Sudoku name length is ${MAX_SUDOKU_NAME_LENGTH}`
      ),
    },
  }),
};

export const loginRules: Login = {
  rules: (t: (value: string) => string) => ({
    email: {
      required: (rules(t).required = {
        value: true,
        message: "Mail is required",
      }),
      pattern: (rules(t).emailPattern = {
        value: rules(t).emailPattern.value,
        message: "Wrong email pattern",
      }),
    },
    password: {
      required: (rules(t).required = {
        value: true,
        message: "Password is required",
      }),
      minLength: rules(t).minLength(
        PASSWORD_MIN_LENGTH,
        `Minimal password length is ${PASSWORD_MIN_LENGTH}`
      ),
      maxLength: rules(t).maxLength(
        MAX_LENGTH,
        `Maximum length for a password is ${MAX_LENGTH}`
      ),
    },
  }),
};

export const registerRules: Register = {
  rules: (t: (value: string) => string) => ({
    email: {
      required: (rules(t).required = {
        value: true,
        message: "Mail is required",
      }),
      pattern: (rules(t).emailPattern = {
        value: rules(t).emailPattern.value,
        message: "Wrong email pattern",
      }),
    },
    password: {
      required: (rules(t).required = {
        value: true,
        message: "Password is required",
      }),
      minLength: rules(t).minLength(
        PASSWORD_MIN_LENGTH,
        `Minimal password length is ${PASSWORD_MIN_LENGTH}`
      ),
      maxLength: rules(t).maxLength(
        MAX_LENGTH,
        `Maximum length for a password is ${MAX_LENGTH}`
      ),
    },
    firstName: {
      required: (rules(t).required = {
        value: true,
        message: "First name is required",
      }),
      minLength: rules(t).minLength(
        NAME_MIN_LENGTH,
        `Minimal name length is ${NAME_MIN_LENGTH}`
      ),
      maxLength: rules(t).maxLength(
        MAX_LENGTH,
        `Maximum length for the first name is ${MAX_LENGTH}`
      ),
    },
    lastName: {
      required: (rules(t).required = {
        value: true,
        message: "Last name is required",
      }),
      minLength: rules(t).minLength(
        NAME_MIN_LENGTH,
        `Minimal name length is ${NAME_MIN_LENGTH}`
      ),
      maxLength: rules(t).maxLength(
        MAX_LENGTH,
        `Maximum length for the last name is ${MAX_LENGTH}`
      ),
    },
    username: {
      required: (rules(t).required = {
        value: true,
        message: "Username is required",
      }),
      minLength: rules(t).minLength(
        USERNAME_MIN_LENGTH,
        `Minimal username length is ${USERNAME_MIN_LENGTH}`
      ),
      maxLength: rules(t).maxLength(
        MAX_LENGTH,
        `Maximum length for the username is ${MAX_LENGTH}`
      ),
    },
  }),
};
