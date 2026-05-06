<script lang='ts'>
  import { subscriberApi } from '$lib/api/subscribers'

  let email = ''
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle'
  let errorMessage = ''

  const submit = async () => {
    if (status === 'loading') return
    if (!email.trim()) return

    status = 'loading'
    errorMessage = ''

    const result = await subscriberApi.subscribe(email.trim())
    if (result.ok) {
      status = 'success'
      email = ''
    } else {
      status = 'error'
      errorMessage = result.message || 'Something went wrong'
    }
  }
</script>

<div class="card-bg border button-border rounded-xl p-6 md:p-8 max-w-xl mx-auto">
  <h3 class="font-custom text-xl md:text-2xl font-bold primary-text mb-2 text-center">
    Get notified about new posts
  </h3>
  <p class="secondary-text text-sm text-center mb-6">
    One email when something new goes up. Unsubscribe any time.
  </p>

  <form on:submit|preventDefault={submit} class="flex flex-col sm:flex-row gap-3">
    <input
      type="email"
      bind:value={email}
      placeholder="you@example.com"
      class="themed-input flex-1 px-4 py-3 border rounded-md"
      required
      disabled={status === 'loading' || status === 'success'}
    />
    <button
      type="submit"
      class="accent-bg accent-hover-bg text-white px-5 py-3 rounded-md font-medium disabled:opacity-50 whitespace-nowrap"
      disabled={status === 'loading' || status === 'success'}
    >
      {#if status === 'loading'}Subscribing…{:else if status === 'success'}Subscribed{:else}Subscribe{/if}
    </button>
  </form>

  {#if status === 'success'}
    <p class="text-center text-sm mt-4 accent-text">Thanks — you're on the list.</p>
  {:else if status === 'error'}
    <p class="text-center text-sm mt-4 text-red-400">{errorMessage}</p>
  {/if}
</div>
