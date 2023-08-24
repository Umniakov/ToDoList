import { format, parseISO, isThisWeek, startOfTomorrow } from "date-fns";

export function timeStamp() {
  return format(new Date(), "MMM dd HH:mm");
}

export function todayDate() {
  return format(new Date(), "yyyy-MM-dd");
}

export function tomorrowDate() {
  return format(startOfTomorrow(), "yyyy-MM-dd");
}

export function isCurrentWeek(date) {
  if (date) {
    const inputDate = date;
    const dateObject = parseISO(inputDate);
    const formattedDate = format(dateObject, "yyyy,M,dd");
    return isThisWeek(new Date(formattedDate), { weekStartsOn: 1 });
  }
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
