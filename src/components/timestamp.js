import { format, parseISO } from "date-fns";

export function timeStamp() {
  return format(new Date(), "MMM dd HH:mm");
}

export function dataFormatForPrint(date) {
  if (date) {
    const inputDate = date;
    const dateObject = parseISO(inputDate);
    const formattedDate = format(dateObject, "MMM d");
    return formattedDate;
  } else {
    return "w/o";
  }
}
