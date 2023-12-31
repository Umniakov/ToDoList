import { timeStamp } from "./timestamp.js";
import { projectDataStore, menuOptions } from "./dataStore.js";
const templateCreate = () => {
  const template = `<div
id="add-item"
class="px-2 h-96 border-2 border-gray-200 border-dashed rounded-lg bg-white"
>
<form action="" class="relative h-full" id="add-item-form">
  <div id="add-item-btn" class="absolute top-3 right-1">
    <button
      type="submit"
      class="relative flex justify-center items-center px-4 py-4 text-sm font-medium text-center text-white bg-green-600 rounded-full hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
    >
      <svg
        class="absolute"
        width="29"
        height="23"
        viewBox="0 0 29 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.25721"
          y1="11.2691"
          x2="13.7027"
          y2="21.3283"
          stroke="white"
          stroke-width="4"
        />
        <line
          x1="11.0752"
          y1="21.744"
          x2="27.2155"
          y2="1.74396"
          stroke="white"
          stroke-width="4"
        />
      </svg>
    </button>
  </div>
  <div id="projectSelect" class="h-8 flex justify-center items-center pt-4">
    <p>Project:</p>
    <button
      type="button"
      id="drop-down-button"
      class="flex justify-center items-center"
    >
      ${sendToRender()}
      <svg
        width="11"
        height="6"
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5.39535 5L10 1" stroke="black" />
      </svg>
    </button>
    <ul
      id="project-drop-down-div"
      class="absolute top-8 bg-slate-50 p-4 border-dashed rounded-lg border-gray-200 border-2 hidden"
    >  
    </ul>
  </div>
  <div
    id="text-fields"
    class="flex flex-col sm:h-[calc(100%-100px)] h-[calc(100%-120px)]"
  >
    <input
      type="text"
      name="title"
      id="title"
      placeholder="Title..."
      spellcheck="false"
      class="pl-2 text-xl font-bold h-12 outline-none focus:border-b"
    />
    <p class="pl-2 text-xs text-gray-400 mb-2" id="timeStamp">${timeStamp()}</p>
    <textarea
      name="taskDescription"
      id="taskDescription"
      placeholder="Start typing"
      spellcheck="false"
      class="pl-2 resize-none grow outline-none"
    ></textarea>
  </div>
  <div
    id="taskOptions"
    class="md:flex-row flex-col flex px-10 py-3 gap-3 justify-between items-center"
  >
    <div id="priority" class="flex items-center">
      <p class="pr-2">Priority:</p>
      <ul class="flex">
        <li>
          <input
            type="radio"
            id="low"
            name="priority"
            value="low"
            class="fixed opacity-0 pointer-events-none peer"
            checked
          />
          <label
            for="low"
            class="peer-checked:bg-green-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >Low</label
          >
        </li>
        <li>
          <input
            type="radio"
            id="medium"
            name="priority"
            value="medium"
            class="fixed opacity-0 pointer-events-none peer"
          />
          <label
            for="medium"
            class="peer-checked:bg-yellow-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >Medium</label
          >
        </li>
        <li>
          <input
            type="radio"
            id="high"
            name="priority"
            value="high"
            class="fixed opacity-0 pointer-events-none peer"
          />
          <label
            for="high"
            class="peer-checked:bg-red-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >High</label
          >
        </li>
      </ul>
    </div>
    <div
      id="duedate"
      class="flex justify-center relative before:content-['bad_format'] before:absolute before:top-6 before:text-red-400 before:hidden focus-within:before:hidden"
    >
      <label for="date">Due date:</label>
      <input
        type="date"
        name="date"
        id="date"
        class="text-gray-300 focus:text-black"
      />
    </div>
  </div>
</form>
</div>`;
  return template;
};

export const formToAddNewItem = () => {
  const divForm = document.createElement("div");
  divForm.id = "addedForm";
  divForm.innerHTML = templateCreate();

  const projectList = divForm.querySelector("#project-drop-down-div");
  const { readProject } = projectDataStore;
  const projectItemTemplate = (projects) => {
    let found = false;
    projects.forEach((e) => {
      let selectedMainProject = "";

      if (e === menuOptions.getMenuOption()) {
        selectedMainProject = "checked";
        found = true;
      }
      const li = document.createElement("li");
      li.innerHTML = `
      <input
        type="radio"
        id="${e}"
        name="project-element"
        value="${e}"
        class="fixed opacity-0 pointer-events-none peer"
        ${selectedMainProject}
      />
      <label
        for="${e}"
        class="peer-checked:bg-blue-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
        >${e}</label
      >
    `;
      projectList.append(li);
    });
    if (!found) {
      let liToMark = projects[0];
      const mainProject = [
        ...projectList.querySelectorAll("li > input"),
      ].filter((e) => e.id === liToMark);
      mainProject[0].checked = true;
    }
  };

  projectItemTemplate(readProject());

  return divForm;
};

const sendToRender = () => {
  let option = menuOptions.getMenuOption();
  let isAProject = projectDataStore.readProject().filter((e) => e === option);
  if (isAProject.length) {
    return isAProject[0];
  } else {
    return projectDataStore.readProject()[0];
  }
};
