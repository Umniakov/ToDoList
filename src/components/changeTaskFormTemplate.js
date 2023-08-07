import { timeStamp } from "./timestamp.js";
import { notesDataStore, projectDataStore } from "./dataStore.js";

//change id for everything and use data??? instead width, and return dom element back after change

const templateCreate = (obj) => {
  const template = `<div
class="px-2 h-96 border-2 border-gray-200 border-dashed rounded-lg bg-white"
data-change-form
>
<form action="" class="relative h-full">
  <div class="absolute top-3 right-1">
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
  <div class="h-8 flex justify-center items-center">
    <p>Project:</p>
    <button
      type="button"
      class="flex justify-center items-center"
      data-btn-project
    >
      ${obj.project}
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
      class="absolute top-8 bg-slate-50 p-4 border-dashed rounded-lg border-gray-200 border-2 hidden"
      data-btn-project-list
    >
    </ul>
  </div>
  <div
    class="flex flex-col sm:h-[calc(100%-100px)] h-[calc(100%-120px)]"
  >
    <input
      type="text"
      name="title"
      placeholder="Title..."
      class="text-xl font-bold h-12 outline-none focus:border-b" 
      value="${obj.title}"
    />
    <p class="text-xs text-gray-400 mb-2" data-time-stamp>${timeStamp()} </p>
    <textarea
      name="taskDescription"
      placeholder="Start typing"
      class="resize-none grow outline-none"
    >${obj.taskDescription}</textarea>
  </div>
  <div
    class="md:flex-row flex-col flex px-10 py-3 gap-3 justify-between items-center"
  >
    <div class="flex items-center">
      <p class="pr-2">Priority:</p>
      <ul class="flex">
        <li>
          <input
            type="radio"
            id="${obj.id}low"
            name="priority"
            value="low"
            class="fixed opacity-0 pointer-events-none peer"
            checked
          />
          <label
            for="${obj.id}low"
            class="peer-checked:bg-green-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >Low</label
          >
        </li>
        <li>
          <input
            type="radio"
            id="${obj.id}medium"
            name="priority"
            value="medium"
            class="fixed opacity-0 pointer-events-none peer"
          />
          <label
            for="${obj.id}medium"
            class="peer-checked:bg-yellow-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >Medium</label
          >
        </li>
        <li>
          <input
            type="radio"
            id="${obj.id}high"
            name="priority"
            value="high"
            class="fixed opacity-0 pointer-events-none peer"
          />
          <label
            for="${obj.id}high"
            class="peer-checked:bg-red-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
            >High</label
          >
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center relative before:content-['bad_format'] before:absolute before:top-6 before:text-red-400 before:hidden focus-within:before:hidden"
    >
      <label for="date">Due date:</label>
      <input
        type="date"
        name="date"
        class="text-gray-300 focus:text-black"
        value="${obj.dueDate}"
      />
    </div>
  </div>
</form>
</div>`;
  return template;
};
export const formToChangeItem = (id) => {
  const divForm = document.createElement("div");
  let data = notesDataStore.getData();
  let index = data.findIndex((e) => e.id === id);
  divForm.innerHTML = templateCreate(data[index]);
  const projectList = divForm.querySelector("[data-btn-project-list]");

  const { readProject } = projectDataStore;
  const projectItemTemplate = (projects) => {
    projects.forEach((e) => {
      let currentProject = "";
      const li = document.createElement("li");
      if (data[index].project === e) {
        currentProject = "checked";
      }
      li.innerHTML = `
      <input
      type="radio"
      id="${e}"
      name="project-element"
      value="${e}"
      class="fixed opacity-0 pointer-events-none peer"
      ${currentProject}
      />
      <label
        for="${e}"
        class="peer-checked:bg-blue-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
        >${e}</label
      >
    `;
      projectList.append(li);
    });
  };
  projectItemTemplate(readProject());

  return divForm;
};
