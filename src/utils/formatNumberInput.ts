// utils/formatNumberInput.ts
export const formatCentsInput  = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "0.00";

  const num = parseInt(digits, 10);

  const formatted = (num / 100).toFixed(2);

  return formatted;
};
