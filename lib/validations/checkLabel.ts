export const checkLabel = (label: string) => {
  if (
    label === "admin" ||
    label === "location" ||
    label === "description" ||
    label === "code"
  ) {
    return "general";
  } else return label;
};
