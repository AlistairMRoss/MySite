<script lang="ts">
  import { goto } from '$app/navigation'
  import { fly } from 'svelte/transition'

  export let title: string
  export let description: string
  export let navigateTo: string
  export let naviageTitle: string
  export let bgColor: string
</script>

<section class="font-custom py-40 {bgColor}">
  <div class="max-w-4xl mx-auto text-center px-8">
    <h2 class="text-3xl md:text-4xl font-bold primary-text mb-6" id="projects">{title}</h2>
    <p class="text-lg secondary-text mb-8">
      {description}
    </p>
    <div class="text-center" in:fly={{ y: 30, duration: 600, delay: 600 }}>
      <button
        class="group relative primary-text border-2 button-border px-6 py-3 rounded-lg button-hover transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
        on:click={() => goto(navigateTo)}
      >
        <span class="text-lg font-medium">{naviageTitle}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>
</section>
