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
