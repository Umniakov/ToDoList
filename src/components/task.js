import { formForAddTask } from "./stateControl.js";

export const visualFun = (title, description) => {
  const template = document.createElement("div");
  template.classList.add("flex", "h-12", "mb-4", "rounded", "bg-gray-50");
  template.innerHTML = `
  <p class="text-2xl text-gray-400">here is ${title} and ${description}</p>
  `;
  console.log(template);
  return template;
};

export const addTaskButton = () => {
  const tskBtn = document.createElement("button");
  tskBtn.setAttribute("type", "button");
  tskBtn.textContent = "+Add task";
  tskBtn.addEventListener("click", formForAddTask);
  return tskBtn;
};
