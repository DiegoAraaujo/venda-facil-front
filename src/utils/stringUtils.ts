export const normalize = (value: string) => value.trim().toLowerCase();

export const isValidSingleWord = (value: string) =>
  /^[A-Za-zÀ-ÖØ-öø-ÿ]+( [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(value.trim());
