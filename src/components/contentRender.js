import {
  notesDataStore,
  projectDataStore,
  menuOptions,
  stateHolder,
} from "./dataStore.js";
import editIcon from "../pics/editIcon.png";
import {
  dataFormatForPrint,
  todayDate,
  isCurrentWeek,
} from "../components/timestamp.js";
import { priorTemplate } from "../components/priorityChange.js";
import { formToChangeItem } from "../components/changeTaskFormTemplate.js";
import { sanitize } from "./sanitize.js";

const { temp } = priorTemplate();

export const tasksFactory = (task) => {
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
        renderWithFilters.toDoStateRender();
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
          renderWithFilters.toDoStateRender();
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
  bodyForTasks.insertBefore(itemDiv, bodyForTasks.firstChild);
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
};

export function taskInstancesCreationController(arr) {
  const bodyForTasks = document.querySelector("#bodyForTasks");
  bodyForTasks.innerHTML = "";
  // console.log(arr);
  arr.forEach((e, i) => {
    tasksFactory(e, i);
  });
}

const projectFactory = (e) => {
  const li = document.createElement("li");
  const bodyForProjects = document.querySelector("[data-project-list]");
  let template = `<a href="#" class="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100 ">
  <span class="flex-1 ml-3 whitespace-nowrap" data-project-name=${e}>${e}</span>
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
  const projects = document.querySelectorAll(
    "[data-project-list] [data-project-name]"
  );
  [...projects].forEach((event) => {
    event.addEventListener("click", menuOptions.updateState);
    let data = notesDataStore
      .getData()
      .filter((item) => item.project === event.innerText);
    let doneCount = data.filter((e) => e.done === true).length;
    let toDoCount = data.length - doneCount;
    event.nextElementSibling.innerText = `${toDoCount}/${doneCount}`;
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
      let nameOfNewProject = sanitize(input.value);
      const { createProject, readProject } = projectDataStore;
      const duplicateCheck = readProject().includes(nameOfNewProject);
      console.log(duplicateCheck);
      if (nameOfNewProject && !duplicateCheck) {
        createProject(nameOfNewProject);

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

//rendering with selected project and status dependency

export const renderWithFilters = (() => {
  const { getData } = notesDataStore;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let today = todayDate();
  let arrToRender = [];

  function updateSub(newValue) {
    composeArr.getListItem(newValue);
  }
  menuOptions.subscribe(updateSub);

  const composeArr = (() => {
    let listItem = "allTasksPage";
    let doneStatus = "todo";

    function getDoneStatus(status) {
      doneStatus = status;
      if (doneStatus === "done") {
        arrToRender = getData().filter((e) => e.done === true);
      } else {
        arrToRender = getData().filter((e) => e.done === false);
      }
      console.log(arrToRender);
      assemble();
    }
    function getListItem(item) {
      listItem = item;
      getDoneStatus(doneStatus);
    }
    function assemble() {
      const toDoInt = document.querySelector("[data-todo] > span");
      const doneInt = document.querySelector("[data-done] > span");
      let counter = 0;
      let countDone = 0;
      let countToDo = 0;
      if (listItem === "allTasksPage") {
        let counter = getData();
        let countDone = counter.filter((e) => e.done === true).length;
        let countToDo = counter.length - countDone;
        doneInt.innerText = countDone;
        toDoInt.innerText = countToDo;
        taskInstancesCreationController(arrToRender);
        projectDelAndChange.hideForm();
      } else if (listItem === "todayTasksPage") {
        let todayTasks = arrToRender.filter((e) => today === e.dueDate);
        let counter = getData().filter((e) => today === e.dueDate);
        let countDone = counter.filter((e) => e.done === true).length;
        let countToDo = counter.length - countDone;
        doneInt.innerText = countDone;
        toDoInt.innerText = countToDo;
        taskInstancesCreationController(todayTasks);
        projectDelAndChange.hideForm();
      } else if (listItem === "weekTasks") {
        let weekTasks = arrToRender.filter((e) => isCurrentWeek(e.dueDate));
        counter = getData().filter((e) => isCurrentWeek(e.dueDate));
        countDone = counter.filter((e) => e.done === true).length;
        countToDo = counter.length - countDone;
        doneInt.innerText = countDone;
        toDoInt.innerText = countToDo;
        taskInstancesCreationController(weekTasks);
        projectDelAndChange.hideForm();
      } else {
        let project = arrToRender.filter((e) => e.project === listItem);
        if (project) {
          counter = getData().filter((e) => e.project === listItem);
          countDone = counter.filter((e) => e.done === true).length;
          countToDo = counter.length - countDone;
          doneInt.innerText = countDone;
          toDoInt.innerText = countToDo;
          taskInstancesCreationController(project);
          projectDelAndChange.addForm();
        }
      }
      projectInstancesCreationController();
    }
    return { getListItem, getDoneStatus };
  })();

  //sort by selected category first (todo\done) and send remaining to further filters
  const toDoStateRender = () => {
    let doneState = stateHolder.getTodoData();
    const toDo = document.querySelector("[data-todo]");
    const done = document.querySelector("[data-done]");
    if (doneState === "todo") {
      toDo.classList.replace("bg-blue-100", "bg-blue-300");
      done.classList.replace("bg-emerald-300", "bg-emerald-100");
    } else {
      toDo.classList.replace("bg-blue-300", "bg-blue-100");
      done.classList.replace("bg-emerald-100", "bg-emerald-300");
    }
    composeArr.getDoneStatus(doneState);
    countersFilters().updateToday();
  };
  return {
    toDoStateRender,
  };
})();
//counter in menu just for today open tasks
const countersFilters = () => {
  const updateToday = () => {
    const counter = document.querySelector("[data-today-counter]");
    let today = todayDate();
    let toDoCounter = notesDataStore
      .getData()
      .filter((e) => e.done === false)
      .filter((e) => today === e.dueDate);
    counter.innerText = toDoCounter.length;
  };
  return { updateToday };
};

export const projectDelAndChange = (() => {
  let holder;
  let projectName;
  let phoneScreenDel;
  let editProject;
  let renameInputHolder;
  function init() {
    holder = document.querySelector("#prodTitle");
    projectName = document.querySelector("[data-project-title]");
    phoneScreenDel = document.querySelector("[data-delete-project-dox]");
    editProject = document.querySelector("[data-edit-project-title]");
    renameInputHolder = document.querySelector("[data-for-rename-input]");
    //delete management pop-up and listeners
    const delProject = document.querySelector("[data-delete-project-title]");
    const dataDelMessage = document.querySelector("[data-dell-message]");
    const dataDelBack = document.querySelector("[data-del-back]");
    const dataDelProject = document.querySelector("[data-del-yes]");
    const dataDelAll = document.querySelector("[data-del-no]");

    delProject.addEventListener("click", deleteProject);
    function deleteProject(e) {
      if (e.target.hasAttribute("data-delete-project-title")) {
        console.log(menuOptions.getMenuOption());
        dataDelMessage.classList.remove("hidden");
        document.addEventListener("click", missClickHide);
      }
      function missClickHide(e) {
        if (
          !delProject.contains(e.target) &&
          !e.target.hasAttribute("data-delete-project-title")
        ) {
          dataDelMessage.classList.add("hidden");
          document.removeEventListener("click", missClickHide);
        }
      }
    }
    dataDelBack.addEventListener("click", (e) => {
      console.log(e.target);
      dataDelMessage.classList.add("hidden");
    });
    dataDelAll.addEventListener("click", () => {
      dataDelMessage.classList.add("hidden");
      //dell items
      let data = notesDataStore
        .getData()
        .filter((item) => item.project === menuOptions.getMenuOption());
      console.log(data);
      data.forEach((e) => {
        notesDataStore.removeItem(e);
      });
      //dell project
      projectDataStore.deleteProject(menuOptions.getMenuOption());
      renderWithFilters.toDoStateRender();
      menuOptions.updateStateViaRename("allTasksPage");
    });

    //dell only project and move tasks to main
    dataDelProject.addEventListener("click", () => {
      dataDelMessage.classList.add("hidden");
      //dell items
      let data = notesDataStore
        .getData()
        .filter((item) => item.project === menuOptions.getMenuOption());
      console.log(data);
      let firstProject = projectDataStore.readProject()[0];
      console.log(firstProject);
      data.forEach((e) => {
        notesDataStore.updateItem(e, "project", firstProject);
      });
      //dell project
      projectDataStore.deleteProject(menuOptions.getMenuOption());
      renderWithFilters.toDoStateRender();
      menuOptions.updateStateViaRename("allTasksPage");
    });
  }

  const form = () => {
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
    return projectForm;
  };
  const addForm = () => {
    projectName.innerText = menuOptions.getMenuOption();
    holder.classList.remove("hidden");
    holder.classList.add("md:block");
    editProject.addEventListener("click", (e) => {
      document.addEventListener("click", clickOutFn);
      if (phoneScreenDel.classList.contains("md:block")) {
        phoneScreenDel.classList.remove("hidden");
      }
      projectName.classList.add("hidden", "md:inline-block");
      if (!renameInputHolder.hasChildNodes()) {
        renameInputHolder.append(form());
      }
      //form management
      const input = renameInputHolder.querySelector("input");
      if (input) {
        input.focus();
      }
      const renameInputForm = document.querySelector(
        "[data-for-rename-input] > form"
      );
      console.log(renameInputForm);
      renameInputForm.addEventListener("submit", (e) => {
        document.removeEventListener("click", clickOutFn);
        e.preventDefault();
        console.log(input.value);
        let nameOfNewProject = sanitize(input.value);
        const { updateProject, readProject } = projectDataStore;
        const duplicateCheck = readProject().includes(nameOfNewProject);
        console.log(duplicateCheck);
        if (nameOfNewProject && !duplicateCheck) {
          //rename project, move all items to new project
          let itemValue = menuOptions.getMenuOption();
          updateProject(readProject().indexOf(itemValue), nameOfNewProject);
          notesDataStore.getData().forEach((e) => {
            if (e.project === itemValue) {
              notesDataStore.updateItem(e, "project", nameOfNewProject);
            }
          });
          //updates with rendering and state
          menuOptions.updateStateViaRename(nameOfNewProject);
          projectInstancesCreationController();
          renderWithFilters.toDoStateRender();
          renameInputHolder.firstChild.remove();
          projectName.innerText = nameOfNewProject;
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
      //doesn't drop listener if menuOption changed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      function clickOutFn(e) {
        console.log(renameInputForm.hasChildNodes());
        if (renameInputHolder.hasChildNodes()) {
          if (
            !renameInputHolder.firstChild.contains(e.target) &&
            !e.target.hasAttribute("data-edit-project-title")
          ) {
            renameInputHolder.firstChild.remove();
            document.removeEventListener("click", clickOutFn);
          }
        }
        //!!!!
        if (!renameInputForm.hasChildNodes()) {
          document.removeEventListener("click", clickOutFn);
        }
      }
    });
  };
  const hideForm = () => {
    holder.classList.add("hidden");
    holder.classList.remove("md:block");
  };
  return { addForm, hideForm, init };
})();
