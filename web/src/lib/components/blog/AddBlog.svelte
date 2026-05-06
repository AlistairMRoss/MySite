<script lang='ts'>
  import { blogStore } from '$lib/stores/blog'
  import { marked } from 'marked'

  marked.setOptions({ breaks: true, gfm: true })

  export let onClose = () => {}
  export let onSuccess = () => {}

  let title = ''
  let content = ''
  let isSubmitting = false

  $: rendered = content.trim() ? marked(content) : ''

  const closeModal = () => {
    title = ''
    content = ''
    onClose()
  }

  const submit = async () => {
    if (isSubmitting) return
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required')
      return
    }

    try {
      isSubmitting = true
      await blogStore.addBlog({ title: title.trim(), content })
      onSuccess()
      closeModal()
    } catch (err) {
      console.error('Error adding blog:', err)
      alert(err instanceof Error ? err.message : 'Failed to add blog')
    } finally {
      isSubmitting = false
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) closeModal()
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) closeModal()
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
  on:keydown={handleKeydown}
  on:click={handleBackdropClick}
>
  <div
    class="card-bg primary-text border button-border rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    role="application"
    aria-labelledby="addBlogTitle"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 id="addBlogTitle" class="font-custom text-2xl font-bold primary-text">
        New Post
      </h2>
      <button
        type="button"
        on:click={closeModal}
        class="secondary-text hover-primary-text card-hover transition-colors p-2 rounded-lg"
        aria-label="Close"
        disabled={isSubmitting}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form on:submit|preventDefault={submit} class="space-y-4">
      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm font-medium primary-text mb-1">Title *</label>
        <input
          type="text"
          bind:value={title}
          class="themed-input w-full px-3 py-2 border rounded-md"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm font-medium primary-text mb-1">Content *</label>
        <textarea
          bind:value={content}
          rows="12"
          class="themed-input w-full px-3 py-2 border rounded-md font-mono text-sm"
          placeholder="Write your post in markdown..."
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      {#if rendered}
        <div class="secondary-bg border button-border rounded-md p-4">
          <p class="text-xs secondary-text font-medium mb-2">Preview</p>
          <div class="prose prose-themed prose-sm max-w-none">
            {@html rendered}
          </div>
        </div>
      {/if}

      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          class="flex-1 accent-bg accent-hover-bg text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Publishing…
          {:else}
            Publish
          {/if}
        </button>
        <button
          type="button"
          on:click={closeModal}
          class="flex-1 primary-text border button-border button-hover py-2 px-4 rounded-md font-medium disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
