import { formToAddNewItem } from "./addTaskFormTemplate.js";
import { formValidation } from "./dataGetAndValidate.js";
import { makeFormForNewProject, renderWithFilters } from "./contentRender.js";
import { stateHolder, menuOptions } from "./dataStore.js";
export function formProjectSelectInteractions() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const btnToAddNewTask = document.querySelector("#btn-to-add-task");

  //close add-new form if clicked outside
  function formListenerHandler(event) {
    if (event.target !== btnToAddNewTask && bodyForTasks.hasChildNodes()) {
      if (!bodyForTasks.firstChild.contains(event.target)) {
        if (bodyForTasks.firstChild.id === "addedForm") {
          bodyForTasks.firstChild.remove();
          btnToAddNewTask.classList.remove("buttonDecorationOpen");
          document.removeEventListener("click", formListenerHandler);
        }
      }
    }
    if (
      !bodyForTasks.hasChildNodes() ||
      bodyForTasks.firstChild.id !== "addedForm"
    ) {
      btnToAddNewTask.classList.remove("buttonDecorationOpen");
      document.removeEventListener("click", formListenerHandler);
    }
  }
  btnToAddNewTask.addEventListener("click", () => {
    if (
      !bodyForTasks.hasChildNodes() ||
      bodyForTasks.firstChild.id !== "addedForm"
    ) {
      bodyForTasks.insertBefore(formToAddNewItem(), bodyForTasks.firstChild);
      btnToAddNewTask.classList.add("buttonDecorationOpen");
      document.addEventListener("click", formListenerHandler);
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
      if (e.target.nodeName === "INPUT") {
        projectDropDownDiv.classList.toggle("hidden");
        projectDropDownBnt.firstChild.textContent = `${e.target.value}`;
      }
    }
    function clickOut(e) {
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
  const menuElements = document.querySelector("[data-menu-elements]");

  barButton.addEventListener("click", () => {
    sidebarMenu.classList.toggle("-translate-x-full");
  });
  document.addEventListener("click", (elem) => {
    const outsideClick =
      !sidebarMenu.contains(elem.target) && !barButton.contains(elem.target);
    if (outsideClick) {
      sidebarMenu.classList.add("-translate-x-full");
    }
    if (menuElements.contains(elem.target)) {
      sidebarMenu.classList.add("-translate-x-full");
    }
  });
}

export function addProjectSidebarBtn() {
  const btnToAddProject = document.querySelector("[data-add-project-btn]");
  btnToAddProject.addEventListener("click", addNewProjectHandler);
  function addNewProjectHandler() {
    makeFormForNewProject();
  }
}

//listening links to correct render
export function pagesListeners() {
  const allTasksPage = document.querySelector("#allTasksPage");
  const todayTasksPage = document.querySelector("#todayTasksPage");
  const weekTasks = document.querySelector("#weekTasks");
  [allTasksPage, todayTasksPage, weekTasks].forEach((e) =>
    e.addEventListener("click", () => menuOptions.updateState(e.id))
  );
  const toDo = document.querySelector("[data-todo]");
  const done = document.querySelector("[data-done]");
  toDo.addEventListener("click", fulfillmentSwitch);
  done.addEventListener("click", fulfillmentSwitch);
  function fulfillmentSwitch(e) {
    if (e.target.hasAttribute("data-done")) {
      stateHolder.setData("done");
    } else {
      stateHolder.setData("todo");
    }
    renderWithFilters.toDoStateRender();
  }
}
