import { format } from "date-fns";

export function timeStamp() {
  return format(new Date(), "MMM dd HH:mm");
}
