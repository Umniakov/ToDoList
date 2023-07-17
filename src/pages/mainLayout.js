import today from "../pics/today.png";
import todoall from "../pics/todoall.png";
import week from "../pics/week.png";
import projects from "../pics/projects.png";

const mainPage = () => {
  const layout = document.createElement("div");
  layout.innerHTML = `<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
  <span class="sr-only">Open sidebar</span>
  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
  </svg>
</button>

<aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
     <ul class="space-y-2 font-medium">
        <li>
           <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100">
              <img src="${todoall}" alt="all" class="w-6 h-6">
              <span class="ml-3">All tasks</span>
           </a>
        </li>
        <li>
           <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100">
           <img src="${today}" alt="day" class="w-6 h-6">
           <span class="flex-1 ml-3 whitespace-nowrap">Today</span>
           <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">3</span>
           </a>
        </li>
        <li>
           <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100">
           <img src="${week}" alt="all" class="w-6 h-6">
           <span class="flex-1 ml-3 whitespace-nowrap">Week</span>
           </a>
        </li>
        <li>
           <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100">
              <img src="${projects}" alt="all" class="w-6 h-6">
              <span class="flex-1 ml-3 whitespace-nowrap">Projects</span>
              <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-blue-100 rounded-full">+</span>
           </a>
           <div id='projectsContainer' class="max-h-48 overflow-y-auto p-4 ml-6 mt-2 border-2 border-gray-200 border-dashed rounded-lg">
           <ul>
           <li>
            <a href="#" class="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100 ">
               <span class="flex-1 ml-3 whitespace-nowrap">Main</span>
               <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full ">4</span>
            </a>
           </li>
           <li>
            <a href="#" class="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100 ">
               <span class="flex-1 ml-3 overflow-x-hidden" title="AnotherAnotherAnotherAnotherAnotherAnotherAnother">AnotherAnotherAnotherAnotherAnotherAnotherAnother</span>
               <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full ">3</span>
            </a>
           </li>
           </ul>
           </div>
        </li>
     </ul>
  </div>
</aside>

<div class="p-4 sm:ml-64">
   <div class="flex flex-col md:flex-row md:gap-6 gap-1 md:p-4 p-1 items-center justify-evenly md:justify-start border-2 border-gray-200 border-dashed rounded-lg mb-4">
      <div id='prodTitle' class="rounded-lg bg-orange-100 py-1 px-4">
      Project: <span>hehe</span>
      </div>
      <div class="flex gap-6 md:p-4 items-center justify-evenly md:justify-start">
      <button type="button" class="rounded-lg bg-blue-100 py-1 px-4 hover:bg-blue-300">To Do
      <span class="inline-flex items-center justify-center px-2 ml-2 text-sm font-medium text-gray-800 bg-blue-50 rounded-full">5</span>
      </button>
      <button type="button" class="rounded-lg bg-emerald-100 py-1 px-4 hover:bg-emerald-300">Done
      <span class="inline-flex items-center justify-center px-2 ml-2 text-sm font-medium text-gray-800 bg-blue-50 rounded-full">2</span>
      </button>

      <button type="button" id="btn-to-add-task" class="flex items-center justify-center rounded-full w-8 h-8 bg-orange-300 py-1 px-1 relative buttonDecoration">
      </button>
      </div>
   </div>
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg" id="bodyForTasks">
  </div>
</div>`;
  return layout;
};

export default mainPage;

{
  /* <div class="grid grid-cols-3 gap-4 mb-4">
  <div class="flex items-center justify-center h-24 rounded bg-gray-50 ">
    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
  </div>
</div>;
<div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
  <p class="text-2xl text-gray-400">+</p>
</div>; */
}
