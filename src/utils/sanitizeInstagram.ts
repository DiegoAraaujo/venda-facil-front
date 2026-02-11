export const sanitizeInstagram = (value: string) =>
  value
    .replace(/@/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9._]/g, "");
