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
//Objects data
export const notesDataStore = (() => {
  let notesData = [];
  const initData = (init) => {
    notesData = init;
  };
  const showInfo = () => {
    console.log(notesData);
    console.dir(localStorage);
  };
  const getData = () => {
    return notesData;
  };
  return { getData, initData, showInfo };
})();

//helper for storage (unbox data and pass it to add behavior)
const createNotesObjFromLocalStore = (() => {
  const { getData } = notesDataStore;
  console.log(getData);
  const initData = (init) => {
    // localStorage.setItem("notesData", JSON.stringify(init));
    init.forEach((e) => getData().push(createNoteObject(e)));
  };
  return { initData };
})();
//helper for input form (get data from input form and pass it to add behavior)
export const addObjFromValidationForm = (() => {
  const { getData } = notesDataStore;
  const addObj = (obj) => {
    localStorage.setItem("notesData", JSON.stringify(obj));
    getData().push(obj);
  };
  return { addObj };
})();

//create Objects behavior
function createNoteObject(obj) {
  const delItem = () => {
    // const found = getData().find((e) => e === obj);
    console.log("found");
  };
  const updItem = () => {
    console.log("updated");
  };
  return Object.assign({}, obj, { delItem, updItem });
}

//first load, get data from localStorage

(() => {
  // localStorage.clear();
  let { initData } = createNotesObjFromLocalStore;
  let { showInfo } = notesDataStore;
  let storage = JSON.parse(localStorage.getItem("notesData")) || [];
  console.log(storage);
  if (!storage.length) {
    storage = [
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "First",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
      },
      {
        dueDate: "2023-06-28",
        priority: "medium",
        project: "First",
        taskDescription: "some text Sure, go ahead, laugh if you want to.",
        timeOfCreation: "Jun 28 12:45",
        title: "Title1",
      },
    ];
  }
  initData(storage);
  showInfo();
})();
