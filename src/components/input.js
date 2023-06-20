import { arrOfProjects } from "./data.js";

function createForm() {
  const formDiv = document.createElement("div");
  const inputForm = document.createElement("form");

  const createBtn = (text, modality) => {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.dataset.modal = "btn";
    btn.innerText = text;
    if (modality) {
      btn.addEventListener("click", modalManagement);
    } else {
      btn.addEventListener("click", modalManagementClose);
    }
    return btn;
  };
  const modalManagement = () => {
    dialog.showModal();
    dialog.classList.add("flex", "flex-col");
  };
  const modalManagementClose = () => {
    dialog.close();
    dialog.classList.remove("flex", "flex-col");
  };

  const prodObjects = (projects) => {
    projects.forEach((e) => {
      dialog.appendChild(createBtn(e.name), false);
    });
  };
  const dialog = document.createElement("dialog");
  const element = document.createElement("button");
  element.innerText = `+Add project`;
  element.setAttribute("type", "button");
  element.addEventListener("click", modalManagementClose);
  dialog.dataset.modal = "dialog";

  inputForm.append(createBtn("Project:", true));
  inputForm.append(dialog);

  prodObjects(arrOfProjects);
  dialog.appendChild(element);

  formDiv.append(inputForm);
  return formDiv;
}

export default createForm;
