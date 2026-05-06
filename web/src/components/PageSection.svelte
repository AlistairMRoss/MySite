<script lang="ts">
  import { goto } from '$app/navigation'
  import { fly } from 'svelte/transition'

  export let title: string
  export let description: string
  export let navigateTo: string
  export let naviageTitle: string
  export let bgColor: string
  export let id: string
  export let eyebrow: string = ''
</script>

<section class="font-custom py-24 {bgColor} px-4 md:px-8" id={ id }>
  <div class="max-w-4xl mx-auto">
    <div class="card-bg border button-border rounded-2xl px-6 py-16 md:px-16 md:py-20 text-center">
      {#if eyebrow}
        <span class="eyebrow mb-4">{eyebrow}</span>
      {/if}
      <h2 class="text-3xl md:text-5xl font-bold primary-text mb-6 mt-4">{title}</h2>
      <p class="text-lg secondary-text mb-10 max-w-2xl mx-auto">
        {description}
      </p>
      <div class="text-center" in:fly={{ y: 30, duration: 600, delay: 600 }}>
        <button
          class="group relative primary-text border button-border px-6 py-3 rounded-lg button-hover transition-all duration-300 flex items-center space-x-2 mx-auto"
          on:click={() => goto(navigateTo)}
        >
          <span class="text-lg font-medium">{naviageTitle}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>
