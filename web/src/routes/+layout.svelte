<script lang=ts>
  import '../app.css'
  import Header from '$lib/components/Header.svelte'
  import { themeInverted } from '$lib/stores/theme'
</script>

<div class="min-h-screen primary-bg flex flex-col {$themeInverted ? 'inverted' : ''}">
  <Header />
  <main>
    <slot />
  </main>
</div>
