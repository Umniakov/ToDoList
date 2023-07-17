import "../style/main.css";
import "../components/sanitize.js";
import "../components/addTaskFormTemplate.js";
import mainPage from "./mainLayout.js";
import { taskInstancesCreationController } from "../components/contentRender.js";
import {
  sidebarOpenIconMobileListener,
  formProjectSelectInteractions,
} from "../components/globalEventListeners.js";
import "../components/dataGetAndValidate.js";
const main = document.querySelector("#content");
main.append(mainPage());
sidebarOpenIconMobileListener();
formProjectSelectInteractions();
taskInstancesCreationController();
