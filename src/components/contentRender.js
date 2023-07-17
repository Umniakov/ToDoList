import { notesDataStore } from "./dataStore.js";
import editIcon from "../pics/editIcon.png";
import { dataFormatForPrint } from "../components/timestamp.js";
import { priorTemplate } from "../components/priorityChange.js";
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
          <div class="flex items-center">
          <p class="text-gray-500">${task.timeOfCreation}</p>
          <p class="text-white px-3 py-0.5 rounded-lg border-white ml-2 text-xs flex items-center cursor-pointer" data-priority>${
            task.priority
          }</p>
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
  if (task.priority === "low") {
    item.classList.add("bg-green-500");
  } else if (task.priority === "medium") {
    item.classList.add("bg-yellow-500");
  } else if (task.priority === "high") {
    item.classList.add("bg-red-500");
  }
  item.addEventListener("click", () => {
    item.innerHTML = priorTemplate;
    const priorit = item.querySelector('input[name="priority"]');
    console.log(priorit);
  });
  // priorit.addEventListener("click", (e) => console.log(e));

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

export function taskInstancesCreationController() {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  const { getData } = notesDataStore;
  bodyForTasks.innerHTML = "";
  getData().forEach((e, i) => {
    tasksFactory(e, i);
  });
}

function makePriority(prior) {
  console.log(prior);
  const item = prior.querySelector("[data-priority]");
  console.log(item);
  const priority = document.createElement("div");
  priority;
  priority;
  if (prior === "low") {
    return `<p class="bg-green-500 text-white px-3 py-0.5 rounded-lg border-white hover:bg-gray-300 ml-2 text-xs flex items-center cursor-pointer">low</p>`;
  } else if (prior === "medium") {
    return `<p class="bg-yellow-500 text-white px-3 py-0.5 rounded-lg border-white hover:bg-gray-300 ml-2 text-xs flex items-center cursor-pointer">medium</p>`;
  }
}
//buttons to add prod and note
