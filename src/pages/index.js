import "../style/main.css";
import { visualFun, addTaskButton } from "../components/task.js";
import { sample } from "../components/data.js";
import sidebar from "../pages/basetemplate.js";
const main = document.querySelector("#content");
console.log(main);
main.append(sidebar());
const barButton = document.querySelector("[data-drawer-target]");
const sidebarMenu = document.querySelector("#default-sidebar");

barButton.addEventListener("click", () => {
  sidebarMenu.classList.toggle("-translate-x-full");
});
document.addEventListener("click", (elem) => {
  const outsideClick =
    !sidebarMenu.contains(elem.target) && !barButton.contains(elem.target);
  if (outsideClick) {
    sidebarMenu.classList.add("-translate-x-full");
  }
  // console.log(outsideClick);
});

const bodyForTasks = document.querySelector("#bodyForTasks");

sample.forEach((e) =>
  bodyForTasks.insertBefore(
    visualFun(e.title, e.description),
    bodyForTasks.firstChild
  )
);

bodyForTasks.append(addTaskButton());
