<script lang='ts'>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { authStore } from '$lib/stores/auth'

  let error = ''

  onMount(async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) {
      error = 'Missing authorization code'
      return
    }

    try {
      await authStore.handleAuthCallback(code)
      await goto('/', { replaceState: true })
    } catch (err) {
      error = err instanceof Error ? err.message : 'Authentication failed'
    }
  })
</script>

<svelte:head>
  <title>Signing in…</title>
</svelte:head>

<section class="font-custom primary-bg primary-text flex min-h-screen items-center justify-center p-8">
  {#if error}
    <div class="text-center">
      <p class="text-xl font-bold mb-2">Authentication failed</p>
      <p class="opacity-75">{error}</p>
    </div>
  {:else}
    <p class="text-xl font-bold">Signing you in…</p>
  {/if}
</section>
