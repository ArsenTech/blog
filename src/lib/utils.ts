import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isChristmas() {
  const today = new Date();
  const month = today.getMonth() + 1,day = today.getDate();
  return (month === 12 && day >= 1) || (month === 1 && day <= 8);
}

export const getBackgroundImageClassName = (suffix = "app") => `bg-${isChristmas() ? "christmas" : "main"}-${suffix}`