import "../style/main.css";
import mainPage from "./mainLayout.js";
import { btnToAdd, testBlock } from "../components/contentRender.js";
import { timeStamp } from "../components/timestamp.js";
import {
  formProjectSelectInteractions,
  sidebarOpenIconMobileListener,
} from "../components/globalEventListeners.js";
import { formValidation } from "../components/dataGetAndValidate.js";
const main = document.querySelector("#content");
main.append(mainPage());
timeStamp();
sidebarOpenIconMobileListener();
formProjectSelectInteractions();
formValidation();
testBlock();
btnToAdd();
