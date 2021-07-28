import { check } from "express-validator";

export const registerRules = [
  check("email").isEmail(),
  check("password").isLength({ min: 5, max: 100 }),
  check("username").isLength({ min: 5, max: 50 }),
  check("first_name").isLength({ min: 2, max: 100 }),
  check("last_name").isLength({ min: 2, max: 100 }),
];

export const loginRules = [
  check("email").isEmail(),
  check("password").isLength({ min: 5, max: 100 }),
];
