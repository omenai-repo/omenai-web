type FilterOptions = {
  price: (string | { min: number; max: number })[];
  year: (string | { min: number; max: number })[];
  medium: string[];
  rarity: string[];
};

export function hasFilterValue(
  filters: FilterOptions,
  label: string,
  value: string | { min: number; max: number }
): boolean {
  // Check if the label exists as a key in the filterOptions object
  if (!filters.hasOwnProperty(label)) {
    return false;
  }

  // Access the corresponding array using type assertion (optional for type safety)
  const filterValues = filters[label as keyof FilterOptions] as (
    | string
    | { min: number; max: number }
  )[];

  // Implement logic to handle both string and object values
  return filterValues.some((filterValue) => {
    if (typeof filterValue === "string") {
      return filterValue === value; // Simple string comparison
    } else {
      // Handle object comparison for min/max range
      if (typeof value === "object" && value !== null) {
        return value.min >= filterValue.min && value.max <= filterValue.max;
      }
      return false; // If value is not an object, no match
    }
  });
}
