import "../style/main.css";
import "../components/sanitize.js";
import "../components/addTaskFormTemplate.js";
import mainPage from "./mainLayout.js";
import {
  renderWithFilters,
  projectInstancesCreationController,
  projectDelAndChange,
} from "../components/contentRender.js";
import {
  sidebarOpenIconMobileListener,
  formProjectSelectInteractions,
  addProjectSidebarBtn,
  pagesListeners,
} from "../components/globalEventListeners.js";
import "../components/dataGetAndValidate.js";
const main = document.querySelector("#content");
main.append(mainPage());
projectDelAndChange.init();
pagesListeners();
sidebarOpenIconMobileListener();
formProjectSelectInteractions();
renderWithFilters.toDoStateRender();
addProjectSidebarBtn();
projectInstancesCreationController();
