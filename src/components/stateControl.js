import { timeStamp } from "../components/timestamp.js";
export const formForAddTask = () => {
  const form = document.querySelector("#add-item");
  const timestamp = document.querySelector("#timeStamp");
  timestamp.textContent = timeStamp();
  form.classList.toggle("hidden");
};
