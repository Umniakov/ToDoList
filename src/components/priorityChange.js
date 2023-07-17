export const priorTemplate = `<form id="priority" class="flex items-center">
<p class="pr-2">Priority:</p>
<ul class="flex">
  <li>
    <input
      type="radio"
      id="low"
      name="priority"
      value="low"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="low"
      class="peer-checked:bg-green-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >Low</label
    >
  </li>
  <li>
    <input
      type="radio"
      id="medium"
      name="priority"
      value="medium"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="medium"
      class="peer-checked:bg-yellow-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >Medium</label
    >
  </li>
  <li>
    <input
      type="radio"
      id="high"
      name="priority"
      value="high"
      class="fixed opacity-0 pointer-events-none peer"
    />
    <label
      for="high"
      class="peer-checked:bg-red-500 peer-checked:text-white px-3 peer-checked:border rounded-lg border-white hover:bg-gray-300"
      >High</label
    >
  </li>
</ul>
</div>`;
