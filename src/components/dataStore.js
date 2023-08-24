import { todayDate, timeStamp, tomorrowDate } from "../components/timestamp.js";
export const projectDataStore = (() => {
  let projectData = [];
  const initProjectData = (init) => {
    init.forEach((e) => projectData.push(e));
  };
  const createProject = (project) => {
    projectData.push(project);
    localStorage.setItem("projectData", JSON.stringify(projectData));
  };
  const readProject = () => {
    return projectData;
  };
  const updateProject = (index, value) => {
    projectData[index] = value;
    localStorage.setItem("projectData", JSON.stringify(projectData));
  };
  const deleteProject = (object) => {
    let index = projectData.indexOf(object);
    projectData.splice(index, 1);
    localStorage.setItem("projectData", JSON.stringify(projectData));
  };
  return {
    createProject,
    updateProject,
    deleteProject,
    readProject,
    initProjectData,
  };
})();
//notes data
export const notesDataStore = (() => {
  let notesData = [];
  const initData = (init) => {
    init.forEach((e) => notesData.push(e));
  };
  const createItem = (item) => {
    notesData.push(item);
    localStorage.setItem("notesData", JSON.stringify(notesData));
  };
  const updateItem = (obj, key, value) => {
    if (key === "done") {
      obj[key] = !obj[key];
    } else {
      obj[key] = value;
    }
    localStorage.setItem("notesData", JSON.stringify(notesData));
  };
  const removeItem = (obj) => {
    const index = notesData.indexOf(obj);
    notesData.splice(index, 1);
    localStorage.setItem("notesData", JSON.stringify(notesData));
  };
  const getData = () => {
    return notesData;
  };
  const showInfo = () => {};
  return { getData, initData, showInfo, createItem, removeItem, updateItem };
})();

//project, selected time and done/todo status
export const stateHolder = (() => {
  let stateData = "todo";
  const setData = (state) => {
    stateData = state;
  };
  const getTodoData = () => {
    return stateData;
  };
  return { setData, getTodoData };
})();

export const menuOptions = (() => {
  let menuState = "allTasksPage";
  const subscribers = [];
  const updateState = (state) => {
    if (state === "allTasksPage") {
      menuState = "allTasksPage";
    } else if (state === "todayTasksPage") {
      menuState = "todayTasksPage";
    } else if (state === "weekTasks") {
      menuState = "weekTasks";
    } else {
      menuState = state.target.innerText;
    }
    notifySubscribers();
  };
  const updateStateViaRename = (state) => {
    menuState = state;
    notifySubscribers();
  };
  function subscribe(callback) {
    subscribers.push(callback);
  }
  function notifySubscribers() {
    for (const subscriber of subscribers) {
      subscriber(menuState);
    }
  }
  const getMenuOption = () => {
    return menuState;
  };
  return { updateState, getMenuOption, subscribe, updateStateViaRename };
})();

(() => {
  let { initProjectData } = projectDataStore;
  let storage = JSON.parse(localStorage.getItem("projectData")) || "empty";
  if (storage === "empty" || !storage.length) {
    storage = ["Main", "Second"];
  }
  localStorage.setItem("projectData", JSON.stringify(storage));
  initProjectData(storage);
  console.log(projectDataStore.readProject()[0]);
})();

//first load, get data from localStorage
(() => {
  // localStorage.clear();
  let { initData } = notesDataStore;
  let storage = JSON.parse(localStorage.getItem("notesData")) || "empty";
  if (storage === "empty" || !storage.length) {
    storage = [
      {
        dueDate: todayDate(),
        priority: "medium",
        project: projectDataStore.readProject()[0],
        taskDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quos, nemo ducimus reprehenderit fugiat maxime omnis corporis iure voluptates sunt voluptatibus nostrum quisquam ex repellat reiciendis possimus tempore porro consequuntur.",
        timeOfCreation: timeStamp(),
        title: "Lorem",
        done: false,
        id: 1689703004641,
      },
      {
        dueDate: todayDate(),
        priority: "high",
        project:
          projectDataStore.readProject()[1] ||
          projectDataStore.readProject()[0],
        taskDescription:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet quas a nobis quisquam sunt iure ipsam obcaecati reiciendis atque hic.",
        timeOfCreation: timeStamp(),
        title: "Ipsum",
        done: true,
        id: 1689703004642,
      },
      {
        dueDate: tomorrowDate(),
        priority: "low",
        project:
          projectDataStore.readProject()[1] ||
          projectDataStore.readProject()[0],
        taskDescription:
          "Ad quos, nemo ducimus reprehenderit fugiat maxime omnis corporis iure voluptates sunt. Eveniet quas a nobis quisquam sunt iure ipsam obcaecati reiciendis atque hic.",
        timeOfCreation: timeStamp(),
        title: "Ipsum",
        done: false,
        id: 1689703004643,
      },
    ];
    localStorage.setItem("notesData", JSON.stringify(storage));
  }
  initData(storage);
})();
