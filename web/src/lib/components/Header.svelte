<script lang='ts'>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let showBackToTop = false

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  onMount(() => {
    const handleScroll = () => {
      showBackToTop = window.scrollY > 200
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

{#if showBackToTop}
  <button
    on:click={scrollToTop}
    class="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
    aria-label="Back to top"
    transition:fade={{ duration: 300 }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
    </svg>
  </button>
{/if}

