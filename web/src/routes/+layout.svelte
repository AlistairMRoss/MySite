<script lang=ts>
  import '../app.css'
  import Header from '$lib/components/Header.svelte'
</script>

<div class="min-h-screen primary-bg flex flex-col">
  <Header />
  <main>
    <slot />
  </main>
</div>
