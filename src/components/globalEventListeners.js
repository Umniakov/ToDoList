import { timeStamp } from "./timestamp.js";
import { formToAddNewItem } from "./addTaskFormTemplate.js";
import { formValidation } from "./dataGetAndValidate.js";
export function formProjectSelectInteractions() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const btnToAddNewTask = document.querySelector("#btn-to-add-task");
  btnToAddNewTask.addEventListener("click", () => {
    if (bodyForTasks.firstChild.id !== "addedForm") {
      console.log(bodyForTasks.firstChild.id);
      bodyForTasks.insertBefore(formToAddNewItem(), bodyForTasks.firstChild);
      btnToAddNewTask.classList.add("buttonDecorationOpen");
      formValidation();
    } else {
      bodyForTasks.removeChild(bodyForTasks.childNodes[0]);
      btnToAddNewTask.classList.remove("buttonDecorationOpen");
      return;
    }
    //Project selection management
    const projectDropDownBnt = document.querySelector("#drop-down-button");
    const projectDropDownDiv = document.querySelector("#project-drop-down-div");
    const addItemFormContainer = document.querySelector("#add-item");

    //hide projects pop-up when selected or clicked-out of the div
    projectDropDownBnt.addEventListener("click", toggleView);
    projectDropDownDiv.addEventListener("click", chooseOption);
    addItemFormContainer.addEventListener("click", clickOut);
    function toggleView() {
      projectDropDownDiv.classList.toggle("hidden");
    }
    function chooseOption(e) {
      console.dir(e.target);
      if (e.target.nodeName === "INPUT") {
        projectDropDownDiv.classList.toggle("hidden");
        projectDropDownBnt.firstChild.textContent = `${e.target.value}`;
      }
    }
    function clickOut(e) {
      console.dir(e.target);
      if (
        !projectDropDownDiv.contains(e.target) &&
        !projectDropDownBnt.contains(e.target)
      ) {
        projectDropDownDiv.classList.add("hidden");
      }
    }
  });
}

export function sidebarOpenIconMobileListener() {
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
  });
}

export const formForAddTask = () => {
  const form = document.querySelector("#add-item");
  const timestamp = document.querySelector("#timeStamp");
  timestamp.textContent = timeStamp();
  form.classList.toggle("hidden");
};
