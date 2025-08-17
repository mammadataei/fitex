import type { DayData } from "@/types";

export const generateRandomInstallData = (): DayData[] => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return days.map((day) => ({
    day,
    value: Math.floor(Math.random() * 4901) + 100, // Random number between 100-5000
  }));
};
