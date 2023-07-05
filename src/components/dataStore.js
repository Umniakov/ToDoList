export const arrOfProjects = [
  {
    name: "first one",
    date: "123",
  },
  {
    name: "second one",
    date: "sdfsd",
  },
  {
    name: "third one",
    date: "blabla",
  },
];
//data
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
    console.log(obj, key);
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
  let storage = JSON.parse(localStorage.getItem("notesData")) || true;
  if (storage === true || !storage.length) {
    storage = [
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "First",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
        done: false,
      },
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "First",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
        done: true,
      },
    ];
    localStorage.setItem("notesData", JSON.stringify(storage));
  }
  initData(storage);
})();
