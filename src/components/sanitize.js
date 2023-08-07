import * as DOMPurify from "dompurify";

export function sanitize(dirty) {
  return DOMPurify.sanitize(dirty);
}
