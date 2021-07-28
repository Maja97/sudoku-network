import t from "./translations.json";

const keys = Object.keys(t.en.translation);

export const translations: typeof t.en.translation = keys.reduce(
  (acc, curr) => ({ ...acc, [curr]: curr }),
  {} as typeof t.en.translation
);
