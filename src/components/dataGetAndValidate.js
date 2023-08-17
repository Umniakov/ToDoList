import { notesDataStore } from "./dataStore.js";
import { sanitize } from "./sanitize.js";
import { renderWithFilters } from "./contentRender.js";
export const formValidation = () => {
  let { createItem } = notesDataStore;
  const itemAddForm = document.querySelector("#add-item-form");
  let dataProblem = false;
  const getData = (e) => {
    e.preventDefault();
    const title = document.querySelector('input[name="title"]').value;
    const timeOfCreation = document.querySelector("#timeStamp").textContent;
    const taskDescription = document.querySelector(
      'textarea[name="taskDescription"]'
    ).value;
    if (!taskDescription) {
      validationHints("emptyNote");
    }
    const project = document.querySelector(
      'input[name="project-element"]:checked'
    ).value;
    const priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;
    const dueDate = document.querySelector('input[name="date"]').value;
    const regex = /^\d{4}-\d{2}-\d{2}$/.test(dueDate);
    if (!regex) {
      if (dueDate) {
        validationHints("dataErr");
        dataProblem = true;
      } else {
        dataProblem = false;
      }
    }

    if (taskDescription && !dataProblem) {
      createItem({
        title: sanitize(title),
        taskDescription: sanitize(taskDescription),
        project,
        priority,
        timeOfCreation,
        dueDate,
        done: false,
        id: Date.now(),
      });
      renderWithFilters.toDoStateRender();
      document
        .querySelector("#btn-to-add-task")
        .classList.remove("buttonDecorationOpen");
    }
  };
  itemAddForm.addEventListener("submit", getData);
};

function validationHints(field) {
  if (field === "emptyNote") {
    const textField = document.querySelector("#taskDescription");
    textField.classList.add("placeholder:text-red-400");
    textField.placeholder = `Should be something there...`;
  }
  if (field === "dataErr") {
    const dateField = document.querySelector("#duedate");
    // eslint-disable-next-line no-unused-vars
    const dateFieldRealTime = document
      .querySelector("#date")
      .addEventListener("change", () => {
        dateField.classList.add(`before:hidden`);
      });
    dateField.classList.remove(`before:hidden`);

    console.log("data");
  }
}
