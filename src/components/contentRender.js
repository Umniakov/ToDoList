import { formForAddTask } from "./globalEventListeners.js";
import { notesData } from "./dataStore.js";
import deleteIcon from "../pics/deleteIcon.png";
import editIcon from "../pics/editIcon.png";

export const tasksFactory = (task) => {
  console.log(task);
  const render = () => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("flex", "justify-between", "bg-red-300", "group");
    itemDiv.innerHTML = `
        <div>
          <h2>${task.title}</h2>
          <p>${task.taskDescription}</p>
          <p>${task.timeOfCreation}</p>
        </div>
        <div class="flex items-center gap-3 group-hover:bg-slate-400 bg-slate-700">
          <div class="">
          <img src="${editIcon}" alt="edit" class="h-6">
          </div>
          <div class="">
          <img src="${deleteIcon}" alt="delete" class="h-6">
          </div>
        </div>
  `;
    return itemDiv;
  };
  return Object.assign({}, task, { render });
};

export function testBlock() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const test = tasksFactory(notesData[0]);
  // console.log(test.render());
  bodyForTasks.appendChild(test.render());
}

// export const btnToAdd = () => {
//   const addTaskButton = () => {
//     const tskBtn = document.createElement("button");
//     tskBtn.setAttribute("type", "button");
//     tskBtn.textContent = "+Add task";
//     tskBtn.addEventListener("click", formForAddTask);
//     return tskBtn;
//   };

//   bodyForTasks.append(addTaskButton());
// };
