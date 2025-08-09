<script>
  let count = $state(0)
  let name = $state('World')

  function increment() {
    count++
  }
</script>

<svelte:head>
  <title>Svelte 5 Basic Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-8">
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">
      Hello {name}!
    </h1>

    <div class="mb-6">
      <label
        class="block text-sm font-medium text-gray-700 mb-2"
      >
        Your name:
      </label>
      <input
        type="text"
        bind:value={name}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div class="mb-6">
      <p class="text-lg text-gray-700 mb-4">Count: {count}</p>
      <button
        onclick={increment}
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        Increment
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-semibold text-blue-800">
          Feature 1
        </h3>
        <p class="text-sm text-blue-600">
          Reactive state
        </p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="font-semibold text-green-800">
          Feature 2
        </h3>
        <p class="text-sm text-green-600">
          Tailwind styling
        </p>
      </div>
    </div>
  </div>
</div>
