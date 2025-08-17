import type { DayData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUUID(): string {
  return nanoid();
}

export const generateRandomInstallData = (): DayData[] => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return days.map((day) => ({
    day,
    value: Math.floor(Math.random() * 4901) + 100, // Random number between 100-5000
  }));
};
