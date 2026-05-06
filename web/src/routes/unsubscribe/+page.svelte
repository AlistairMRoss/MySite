<script lang='ts'>
  import { onMount } from 'svelte'
  import { API_V1 } from '$lib/api/config'

  let status: 'loading' | 'done' | 'notfound' | 'error' = 'loading'

  onMount(async () => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) {
      status = 'notfound'
      return
    }

    try {
      const res = await fetch(`${API_V1}/unsubscribe/${token}`)
      if (!res.ok) {
        status = 'error'
        return
      }
      const data = await res.json()
      status = data.result?.removed ? 'done' : 'notfound'
    } catch {
      status = 'error'
    }
  })
</script>

<svelte:head>
  <title>Unsubscribe | Alistair Ross</title>
</svelte:head>

<section class="font-custom primary-bg primary-text min-h-screen flex items-center justify-center p-8">
  <div class="card-bg border button-border rounded-xl p-8 max-w-md w-full text-center">
    {#if status === 'loading'}
      <p class="secondary-text">Unsubscribing…</p>
    {:else if status === 'done'}
      <h1 class="text-2xl font-bold mb-2">Unsubscribed</h1>
      <p class="secondary-text">You won't receive any more emails about new posts.</p>
    {:else if status === 'notfound'}
      <h1 class="text-2xl font-bold mb-2">Already unsubscribed</h1>
      <p class="secondary-text">This link is no longer active.</p>
    {:else}
      <h1 class="text-2xl font-bold mb-2">Something went wrong</h1>
      <p class="secondary-text">Please try the link again later.</p>
    {/if}
  </div>
</section>
