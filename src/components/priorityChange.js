export const priorTemplate = () => {
  let counter = 0;
  function temp() {
    counter++;
    const template = `<form class="flex items-center">
<p class="pr-2">Priority:</p>
<ul class="flex">
  <li>
    <input
      type="radio"
      id="low${counter}"
      name="priority${counter}"
      value="low"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="low${counter}"
      class="peer-checked:bg-green-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >Low</label
    >
  </li>
  <li>
    <input
      type="radio"
      id="medium${counter}"
      name="priority${counter}"
      value="medium"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="medium${counter}"
      class="peer-checked:bg-yellow-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >Medium</label
    >
  </li>
  <li>
    <input
      type="radio"
      id="high${counter}"
      name="priority${counter}"
      value="high"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="high${counter}"
      class="peer-checked:bg-red-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >High</label
    >
  </li>
</ul>
</div>`;
    return template;
  }
  return { temp };
};
