import { formForAddTask } from "./globalEventListeners.js";
import { notesDataStore } from "./dataStore.js";
import deleteIcon from "../pics/deleteIcon.png";
import editIcon from "../pics/editIcon.png";

export const tasksFactory = (task, index) => {
  const handle = notesDataStore;
  // console.log(handle.getItem());
  const render = () => {
    const itemDiv = document.createElement("div");
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
        <input type="checkbox" class="h-5 w-5 bg-cyan-100">
        </div>
        <div>
          <h2>${task.title}</h2>
          <p>${task.taskDescription}</p>
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
          <img src="${deleteIcon}" alt="delete" class="max-w-none h-6 w-6">
          </div>
        </div>
  `;
    return itemDiv;
  };
  // const listeners = () => {

  // }
  // function del() {
  //   handle.delItem();
  // }
  return Object.assign({}, task, { render, handle });
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
    bodyForTasks.append(tasksFactory(e, i).render());
  });
  console.log(getData());
  bodyForTasks.append(btnToAdd());
}
