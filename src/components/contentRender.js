import { notesDataStore, projectDataStore } from "./dataStore.js";
import editIcon from "../pics/editIcon.png";
import { dataFormatForPrint } from "../components/timestamp.js";
import { priorTemplate } from "../components/priorityChange.js";
import { formToChangeItem } from "../components/changeTaskFormTemplate.js";
const { temp } = priorTemplate();

export const tasksFactory = (task, index) => {
  const { removeItem, updateItem } = notesDataStore;
  const itemDiv = document.createElement("div");
  const render = () => {
    itemDiv.id = task.id;
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
          <div class="px-3 py-0.5 rounded-lg border-white ml-2 text-xs items-center cursor-pointer flex invisible" data-priority-selector></div>
          </div>
        </div>
        <div class="md:w-56 hidden md:block">
          <div class="text-gray-500">Due date: ${dataFormatForPrint(
            task.dueDate
          )}</div>
          <div class="text-gray-500">Project: ${task.project}</div>
        </div>
        <div class="flex flex-col md:flex-row ml-auto md:invisible items-center justify-center gap-2 group-hover:visible" data-change-del-btn>
          <div>
          <img src="${editIcon}" alt="edit" class="max-w-none h-6 w-6 hover:scale-105 transform duration-100 hover:rotate-45" data-change>
          </div>
          <div class="hidden" data-show-del-btn>
            <div class="delIcon h-8 w-8 my-2 bg-red-400 hover:bg-red-500 rounded-full relative flex items-center justify-center" data-del>
            </div>
          </div>
        </div>
  `;
    return itemDiv;
  };
  render();

  const renderBehavior = () => {
    const textNodes = itemDiv.querySelectorAll("[data-text]");
    const checkbox = itemDiv.querySelector("input[type=checkbox]");
    const item = itemDiv.querySelector("[data-priority]");
    //priority coloring, selecting and listening
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
    item.addEventListener("click", () => {
      item.classList.add("hidden");
      priorSelector.innerHTML = temp();
      priorSelector.classList.remove("invisible");
      priorityColoring(priorSelector);
      const priorit = priorSelector.querySelectorAll('input[type="radio"]');
      priorit.forEach((e) => {
        if (e.value === task.priority) {
          e.checked = true;
        }
      });
    });
    priorSelector.addEventListener("click", changePriority);
    function changePriority(e) {
      if (e.target.nodeName === "INPUT") {
        updateItem(task, "priority", e.target.defaultValue);
        priorityColoring(priorSelector);
        priorSelector.innerHTML = "";
        priorSelector.classList.add("invisible");
        priorityColoring(item);
        item.textContent = e.target.defaultValue;
        item.classList.remove("hidden");
      }
    }
    //mark through if its done (rerender)
    if (task.done) {
      textNodes.forEach((e) => e.classList.toggle("line-through"));
      checkbox.checked = true;
    }
    //delete item, check if marked as done and open whole form for editing
    itemDiv.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-del")) {
        itemDiv.remove();
        removeItem(task);
      }
      if (e.target.type === "checkbox") {
        textNodes.forEach((e) => e.classList.toggle("line-through"));
        updateItem(task, "done");
      }
      //editing
      if (e.target.hasAttribute("data-change")) {
        itemDiv.classList.remove("flex", "px-3", "py-1");
        const bebe = itemDiv.children;
        [...bebe].forEach((e) => {
          if (!e.hasAttribute("data-change-del-btn")) {
            e.classList.add("hidden", "md:hidden");
          } else {
            e.children[1].classList.remove("hidden");
            e.children[0].classList.add("hidden");
          }
        });
        itemDiv.insertBefore(formToChangeItem(task.id), itemDiv.firstChild);

        const prior = itemDiv.querySelectorAll('input[name="priority"]');
        const dataChangeForm = itemDiv.querySelector("[data-change-form]");
        const projectBtn = itemDiv.querySelector("[data-btn-project]");
        const projectList = itemDiv.querySelector("[data-btn-project-list]");
        const btnToConfirmChange = itemDiv.querySelector(
          'button[type="submit"]'
        );
        prior.forEach((e) => {
          if (e.value === task.priority) {
            e.checked = true;
          }
        });
        projectBtn.addEventListener("click", () => {
          projectList.classList.remove("hidden");
        });
        projectList.addEventListener("click", (e) => {
          if (e.target.nodeName === "INPUT") {
            projectList.classList.toggle("hidden");
            projectBtn.firstChild.textContent = `${e.target.value}`;
          }
        });
        dataChangeForm.addEventListener("click", (e) => {
          if (
            !projectList.contains(e.target) &&
            !projectBtn.contains(e.target)
          ) {
            projectList.classList.add("hidden");
          }
        });
        //click outside will close item
        document.addEventListener("click", renderOriginal);
        //write changes to datastore
        btnToConfirmChange.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("yesBtn");
          const updatedObj = {};
          updatedObj.title = itemDiv.querySelector('input[name="title"]').value;
          updatedObj.dueDate =
            itemDiv.querySelector('input[type="date"]').value;
          updatedObj.taskDescription = itemDiv.querySelector(
            'textarea[name="taskDescription"]'
          ).value;
          updatedObj.priority = itemDiv.querySelector(
            'input[name="priority"]:checked'
          ).value;
          updatedObj.project = itemDiv.querySelector(
            'input[name="project-element"]:checked'
          ).value;
          updatedObj.timeOfCreation =
            itemDiv.querySelector("[data-time-stamp]").textContent;
          Object.entries(updatedObj).forEach(([key, value]) => {
            updateItem(task, key, value);
          });
          //itemDiv doesn't contain btn anymore
          render();
        });
      }
    });

    //update title and text with "editable"
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
  };
  const bodyForTasks = document.querySelector("#bodyForTasks");
  bodyForTasks.append(itemDiv);
  renderBehavior();
  //if clicked out, remove listener and rerender
  function renderOriginal(event) {
    if (!itemDiv.contains(event.target)) {
      console.log("yesOut");
      render();
      renderBehavior();
      document.removeEventListener("click", renderOriginal);
    }
  }
  //!!!!!!!!!!!!!!!!!!!!!!redo
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

const projectFactory = (e, i) => {
  const li = document.createElement("li");
  const bodyForProjects = document.querySelector("[data-project-list]");
  let template = `<a href="#" class="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100 ">
  <span class="flex-1 ml-3 whitespace-nowrap">${e}</span>
  <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full ">4</span>
</a>`;
  li.innerHTML = template;
  bodyForProjects.append(li);
};

//rendering projects
export const projectInstancesCreationController = () => {
  const bodyForProjects = document.querySelector("[data-project-list]");
  const { readProject } = projectDataStore;
  bodyForProjects.innerHTML = "";
  readProject().forEach((e, i) => {
    projectFactory(e, i);
  });
};

export function makeFormForNewProject() {
  const divOfProjects = document.querySelector("#projectsContainer > ul");
  const bodyForProjects = document.querySelector("[data-project-list]");
  if (divOfProjects.firstChild.tagName !== "FORM") {
    const projectForm = document.createElement("form");
    projectForm.classList.add("flex", "relative", "items-center");
    const input = document.createElement("input");
    const projectFormSubmit = document.createElement("button");
    projectFormSubmit.setAttribute("type", "submit");
    projectFormSubmit.innerText = "Add";
    projectFormSubmit.classList.add(
      "p-1",
      "rounded-2xl",
      "bg-green-200",
      "absolute",
      "right-1",
      "text-xs",
      "hover:bg-green-300"
    );
    input.classList.add(
      "ml-3",
      "p-1",
      "w-40",
      "border",
      "rounded-lg",
      "outline-none"
    );
    input.setAttribute("placeholder", "Type here!");
    projectForm.append(input, projectFormSubmit);
    divOfProjects.insertBefore(projectForm, divOfProjects.children[0]);

    const projectFormSubmitBtn = document.querySelector(
      "#projectsContainer form"
    );
    const inputFocus = projectForm.querySelector("input");
    if (inputFocus) {
      inputFocus.focus();
    }
    console.log(projectFormSubmitBtn);
    projectFormSubmitBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      const { createProject, readProject } = projectDataStore;
      const duplicateCheck = readProject().includes(input.value);
      console.log(duplicateCheck);
      if (input.value && !duplicateCheck) {
        createProject(input.value);

        if (divOfProjects.firstChild.tagName === "FORM") {
          divOfProjects.firstChild.remove();
          projectInstancesCreationController();
        }
      } else if (duplicateCheck) {
        input.value = "";
        input.placeholder = "Already exists";
        input.classList.add("placeholder:text-red-400");
      } else {
        input.placeholder = "Empty :c";
        input.classList.add("placeholder:text-red-400");
      }
    });
    //close if click outside
    document.addEventListener("click", (e) => {
      if (divOfProjects.firstChild.tagName === "FORM") {
        console.log("hi");
        if (
          !bodyForProjects.firstChild.contains(e.target) &&
          !e.target.hasAttribute("data-add-project-btn")
        ) {
          console.log("yes");
          divOfProjects.firstChild.remove();
          projectInstancesCreationController();
        }
      }
    });
  }
}

//rendering with project/time dependency
// renderAllTasksPage() {

// }
