<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { authStore } from '$lib/stores/auth'

  let loading = true
  let error = ''

  onMount(async () => {
    const code = $page.url.searchParams.get('code')
    const errorParam = $page.url.searchParams.get('error')

    if (errorParam) {
      error = `Authentication error: ${errorParam}`
      loading = false
      return
    }

    if (!code) {
      error = 'No authorization code received'
      loading = false
      return
    }

    try {
      await authStore.handleAuthCallback(code)
      // Redirect to dashboard or home page
      goto('/')
    } catch (err: any) {
      error = err.message
    } finally {
      loading = false
    }
  })
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-lg">Completing authentication...</p>
    </div>
  </div>
{:else if error}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center max-w-md">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-red-800 mb-2">Authentication Failed</h2>
        <p class="text-red-600 mb-4">{error}</p>
        <button 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          on:click={() => goto('/')}
        >
          Return Home
        </button>
      </div>
    </div>
  </div>
{/if}
