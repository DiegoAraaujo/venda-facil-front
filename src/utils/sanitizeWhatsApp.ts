export const sanitizeWhatsApp = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.slice(0, 11);
};
