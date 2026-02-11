export const formatDate= (dateString: string | Date): string => {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};