import { months } from "@/constants/months"

/**
 * Given dateString in format YYYY-MM-DD convert to MMM/DD/YYYY
 * @param dateString
 * @returns MMM/DD/YYYY
 */
export const convertMMMDDYYYY = (dateString: string) => {
  const [year, month, day] = dateString.split("-")

  return `${months[month]} ${day}, ${year}`
}

/**
 * Given dateString in format YYYY-MM-DD convert to MM/DD
 * @param dateString
 * @returns MM/DD
 */
export const convertToMMDD = (dateString: string) => {
  const [year, month, day] = dateString.split("-")
  return `${month}/ ${day}`
}

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
  })

  return formatter.format(date)
}

export const getRange = (dateString: string, days: number) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() - days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate() + 2).padStart(2, "0")
  return `${year}-${month}-${day}`
}

declare global {
  interface String {
    titleize(): string
  }
}

/**
 * Titleizes a string by capitalizing the first letter of each word
 * and lowercasing the rest of the letters.
 * @returns Titleized string
 */
String.prototype.titleize = function () {
  const words = this.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return words.join(" ")
}

/**
 * Converts a decimal number to its fractional representation.
 * Handles common fractions and improper fractions.
 * @param decimal
 * @returns
 */
export const decimalToFraction = (decimal: number): string => {
  if (isNaN(decimal)) {
    return "Invalid input"
  }

  if (decimal === Math.floor(decimal)) {
    return `${decimal}`
  }

  const fractions = [
    { fraction: "1/8", value: 0.125 },
    { fraction: "1/4", value: 0.25 },
    { fraction: "3/8", value: 0.375 },
    { fraction: "1/2", value: 0.5 },
    { fraction: "5/8", value: 0.625 },
    { fraction: "3/4", value: 0.75 },
    { fraction: "7/8", value: 0.875 },
    { fraction: "1/3", value: 0.333333 }, // Added 1/3
    { fraction: "2/3", value: 0.666667 }, // Added 2/3
  ]

  for (let i = 0; i < fractions.length; i++) {
    if (Math.abs(decimal - fractions[i].value) < 0.01) {
      return fractions[i].fraction
    }
  }

  if (decimal > 1) {
    const wholeNumber = Math.floor(decimal)
    const fractionalPart = decimal - wholeNumber
    const fraction = decimalToFraction(fractionalPart)

    return `${wholeNumber} ${fraction}`
  }

  const precision = 1000000
  const numerator = Math.round(decimal * precision)
  const denominator = precision

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const commonDivisor = gcd(numerator, denominator)

  const simplifiedNumerator = numerator / commonDivisor
  const simplifiedDenominator = denominator / commonDivisor

  return `${simplifiedNumerator}/${simplifiedDenominator}`
}
