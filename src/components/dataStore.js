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
  const updateProject = (project, value) => {
    projectData[project] = value;
    localStorage.setItem("projectData", JSON.stringify(projectData));
  };
  const deleteProject = (project) => {
    projectData[project].remove();
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
    console.log(notesData);
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
    // console.log(obj, key);
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
  const showInfo = () => {
    console.log(notesData);
    console.dir(localStorage);
  };
  return { getData, initData, showInfo, createItem, removeItem, updateItem };
})();

//first load, get data from localStorage
(() => {
  // localStorage.clear();
  let { initData } = notesDataStore;
  let storage = JSON.parse(localStorage.getItem("notesData")) || "empty";
  if (storage === "empty" || !storage.length) {
    storage = [
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "Main",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
        done: false,
        id: 1689703004641,
      },
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "Second",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
        done: true,
        id: 1689703004642,
      },
    ];
    localStorage.setItem("notesData", JSON.stringify(storage));
  }
  initData(storage);
})();

(() => {
  let { initProjectData } = projectDataStore;
  let storage = JSON.parse(localStorage.getItem("projectData")) || "empty";
  if (storage === "empty" || !storage.length) {
    storage = ["Main", "Second"];
  }
  localStorage.setItem("projectData", JSON.stringify(storage));
  initProjectData(storage);
})();
