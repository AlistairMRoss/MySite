 <script lang='ts'>
  import { fly } from 'svelte/transition'
</script>

<section class="font-custom welcome-section primary-bg min-h-screen flex flex-col items-center justify-center p-8 relative">
  <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
  <!-- eslint-disable-next-line svelte/valid-compile -->
  <h1 
    class="font-custom welcome-text primary-text text-4xl md:text-6xl font-bold mb-12 text-center cursor-pointer select-none user-select-none" 
    in:fly={{ y: 50, duration: 800, delay: 200 }}
    role="button"
    tabindex="0"
  >
    Sorry there isnt anything here yet
  </h1>

</section>
