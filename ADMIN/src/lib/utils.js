import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (value) => {
  return new Intl.NumberFormat("es-us", {
    style: "currency",
    currency: "KES",
  }).format(value);
};

export const convertFirestoreTimestampToDate = (timestamp) => {
  if (!timestamp) {
    return null; // Handle cases where timestamp might be undefined or null
  }

  try {
    const date = timestamp.toDate();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // Add other formatting options as needed (e.g., time, weekday)
    };
    return date.toLocaleDateString("en-US", options); // Format based on locale
  } catch (error) {
    console.error("Error converting");
    return null;
  }
};
