import { add, format } from "date-fns";

export function getSubscriptionExpiryDate(interval: "monthly" | "yearly") {
  const currentDate = new Date();
  const futureDate = add(
    currentDate,
    interval === "monthly" ? { months: 1 } : { years: 1 }
  );
  return format(futureDate, "yyyy-MM-ddTHH:mm:ss.SSSXXX");
}

// Example usage:
const currentDate = new Date();
const monthlyExpiry = getSubscriptionExpiryDate("monthly");
const yearlyExpiry = getSubscriptionExpiryDate("yearly");

console.log(monthlyExpiry); // Output: e.g., 2024-09-14T12:20:17.000+01:00
console.log(yearlyExpiry); // Output: e.g., 2025-08-14T12:20:17.000+01:00
