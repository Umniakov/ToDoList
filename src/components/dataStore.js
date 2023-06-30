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

export const notesDataHandler = (() => {
  let notesData = [];
  const initData = (init) => {
    notesData = init;
  };
  const show = () => {
    console.log(notesData);
    console.dir(localStorage);
  };
  const addItem = (obj) => {
    notesData.push(obj);
    localStorage.setItem("notesData", JSON.stringify(notesData));
    show();
  };
  const getItem = () => {
    return notesData;
  };
  return { initData, show, addItem, getItem };
})();

(() => {
  let { initData, show } = notesDataHandler;
  let test = JSON.parse(localStorage.getItem("notesData")) || [];
  if (!test.length) {
    test = [
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
  initData(test);
  show();
})();
