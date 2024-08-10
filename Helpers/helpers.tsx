import { months } from "@/constants/months";

/**
 * Given dateString in format YYYY-MM-DD convert to MMM/DD/YYYY
 * @param dateString 
 * @returns MMM/DD/YYYY
 */
export const convertMMMDDYYYY = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  return `${months[month]} ${day}, ${year}`;
};

/**
 * Given dateString in format YYYY-MM-DD convert to MMM/DD/YYYY
 * @param dateString 
 * @returns MMM/DD/YYYY
 */
export const convertToMMDD = (dateString : string) => {
  const [year, month, day] = dateString.split("-");
  return `${month}/ ${day}`;
};

/**
 * Given a date obj return date in YYYY-MM-DD format
 * @param date 
 * @returns 
 */
export const convertToDbDateFormat = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
};
