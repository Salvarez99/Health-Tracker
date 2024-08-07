import { months } from "@/constants/months";

export const convertDateString = (dateString: string) => {
    let [month, day, year]: string[] = dateString.split(" ");
    const monthNum = months[month];
    day = day.replace(",", "");
    return `${monthNum} / ${day}`;
}

export const formatDate = (date : Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };