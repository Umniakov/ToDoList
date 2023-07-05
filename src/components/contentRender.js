import { formForAddTask } from "./globalEventListeners.js";
import { notesDataStore } from "./dataStore.js";
import deleteIcon from "../pics/deleteIcon.png";
import editIcon from "../pics/editIcon.png";

export const tasksFactory = (task, index) => {
  const { removeItem, updateItem } = notesDataStore;
  const itemDiv = document.createElement("div");
  const render = () => {
    itemDiv.id = index;
    itemDiv.classList.add(
      "flex",
      "items-center",
      "hover:bg-slate-100",
      "rounded-lg",
      "py-1",
      "px-3",
      "gap-4",
      "group"
    );
    itemDiv.innerHTML = `
        <div class="">
        <input type="checkbox" class="h-5 w-5 bg-cyan-100 data-done">
        </div>
        <div data-data>
          <h2 data-text='h2' class='outline-none' contenteditable="true">${task.title}</h2>
          <p data-text='p' class='outline-none' contenteditable="true">${task.taskDescription}</p>
          <div class="flex items-center">
          <p class="text-gray-500">${task.timeOfCreation}</p>
          <p class="bg-green-500 text-white px-3 py-0.5 rounded-lg border-white hover:bg-gray-300 ml-2 text-xs flex items-center">Low</p>
          </div>
        </div>
        <div class="ml-auto flex invisible items-center gap-2 group-hover:visible">
          <div class="">
          <img src="${editIcon}" alt="edit" class=" max-w-none h-6 w-6">
          </div>
          <div class="">
          <img src="${deleteIcon}" alt="delete" class="max-w-none h-6 w-6" data-del>
          </div>
        </div>
  `;
    return itemDiv;
  };
  render();
  const textNodes = itemDiv.querySelectorAll("[data-text]");
  const checkbox = itemDiv.querySelector("input[type=checkbox]");
  console.log(checkbox);
  console.log(task.done);
  if (task.done) {
    textNodes.forEach((e) => e.classList.toggle("line-through"));
    checkbox.checked = true;
  }
  itemDiv.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    console.dir(e.target);
    if (e.target.hasAttribute("data-del")) {
      itemDiv.remove();
      removeItem(task);
    }
    if (e.target.type === "checkbox") {
      textNodes.forEach((e) => e.classList.toggle("line-through"));
      updateItem(task, "done");
    }
  });
  textNodes.forEach((e) =>
    e.addEventListener("input", () => {
      const updatedText = e.textContent;
      console.log(updatedText);
      if (e.dataset.text === "p") {
        updateItem(task, "taskDescription", updatedText);
      } else if (e.dataset.text === "h2") {
        console.log("up");
        updateItem(task, "title", updatedText);
      }
    })
  );
  const bodyForTasks = document.querySelector("#bodyForTasks");
  bodyForTasks.append(itemDiv);
  return Object.assign({}, task, { render });
};

export const btnToAdd = () => {
  const tskBtn = document.createElement("button");
  tskBtn.setAttribute("type", "button");
  tskBtn.textContent = "+Add task";
  tskBtn.addEventListener("click", formForAddTask);
  return tskBtn;
};
export function testBlock() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const { getData } = notesDataStore;
  bodyForTasks.innerHTML = "";
  getData().forEach((e, i) => {
    tasksFactory(e, i);
  });
  bodyForTasks.append(btnToAdd());
}
