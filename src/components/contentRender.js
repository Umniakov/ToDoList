import { notesDataStore } from "./dataStore.js";
import editIcon from "../pics/editIcon.png";
import { dataFormatForPrint } from "../components/timestamp.js";
import { priorTemplate } from "../components/priorityChange.js";
const { temp } = priorTemplate();

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
        <div data-data class="grow">
          <h2 data-text='h2' class='outline-none' contenteditable="true">${
            task.title
          }</h2>
          <p data-text='p' class='outline-none' contenteditable="true">${
            task.taskDescription
          }</p>
          <div class="flex items-center" data-priority-parent>
          <p class="text-gray-500">${task.timeOfCreation}</p>
          <p class="text-white px-3 py-0.5 rounded-lg border-white ml-2 text-xs flex items-center cursor-pointer" data-priority>${
            task.priority
          }</p>
          <div class="px-3 py-0.5 rounded-lg border-white ml-2 text-xs items-center cursor-pointer hidden" data-priority-selector></div>
          </div>
        </div>
        <div class="md:w-56 hidden md:block">
          <div class="text-gray-500">Due date: ${dataFormatForPrint(
            task.dueDate
          )}</div>
          <div class="text-gray-500">Project: ${task.project}</div>
        </div>
        <div class="md:flex ml-auto invisible items-center gap-2 group-hover:visible hidden group-hover:flex">
          <div class="">
          <img src="${editIcon}" alt="edit" class="max-w-none h-6 w-6 hover:scale-105 transform duration-100 hover:rotate-45">
          </div>
          <div class="delIcon h-5 w-5 bg-red-400 hover:bg-red-500 rounded-full relative flex items-center justify-center" data-del>
          </div>
        </div>
  `;
    return itemDiv;
  };

  render();
  const textNodes = itemDiv.querySelectorAll("[data-text]");
  const checkbox = itemDiv.querySelector("input[type=checkbox]");
  const item = itemDiv.querySelector("[data-priority]");
  //priority coloring and listen
  function priorityColoring(element) {
    if (task.priority === "low") {
      element.classList.add("bg-green-500");
      element.classList.remove("bg-yellow-500");
      element.classList.remove("bg-red-500");
    } else if (task.priority === "medium") {
      element.classList.add("bg-yellow-500");
      element.classList.remove("bg-red-500");
      element.classList.remove("bg-green-500");
    } else if (task.priority === "high") {
      element.classList.add("bg-red-500");
      element.classList.remove("bg-yellow-500");
      element.classList.remove("bg-green-500");
    }
  }
  priorityColoring(item);
  const priorSelector = itemDiv.querySelector("[data-priority-selector]");
  console.log(priorSelector);
  item.addEventListener("click", () => {
    item.classList.add("hidden");
    priorSelector.classList.replace("hidden", "flex");
    priorSelector.innerHTML = temp();
    priorityColoring(priorSelector);
    const priorit = priorSelector.querySelectorAll('input[type="radio"]');
    console.log(priorit);
    priorit.forEach((e) => {
      if (e.value === task.priority) {
        e.checked = true;
      }
    });
  });
  priorSelector.addEventListener("click", changePriority);
  function changePriority(e) {
    if (e.target.nodeName === "INPUT") {
      task.priority = e.target.defaultValue;
      priorityColoring(priorSelector);
      priorSelector.classList.replace("flex", "hidden");
      priorSelector.innerHTML = "";
      priorityColoring(item);
      item.textContent = e.target.defaultValue;
      item.classList.remove("hidden");
    }
  }

  // priorit.addEventListener("click", (e) => console.log(e));

  if (task.done) {
    textNodes.forEach((e) => e.classList.toggle("line-through"));
    checkbox.checked = true;
  }
  itemDiv.addEventListener("click", (e) => {
    // console.log(e.target.dataset);
    // console.dir(e.target);
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

export function taskInstancesCreationController() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const { getData } = notesDataStore;
  bodyForTasks.innerHTML = "";
  getData().forEach((e, i) => {
    tasksFactory(e, i);
  });
}

//buttons to add prod and note
