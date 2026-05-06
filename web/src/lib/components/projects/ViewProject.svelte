<script lang='ts'>
  import { marked } from 'marked'

  export let project
  export let onClose = () => {}

  marked.setOptions({
    breaks: true,
    gfm: true
  })

  $: renderedDescription = project?.description ? marked(project.description) : ''

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'live': return 'status-live'
      case 'in progress': return 'status-progress'
      default: return 'status-complete'
    }
  }

  const openProjectLink = () => {
    if (project?.link && project.link !== '#' && project.link !== '') {
      window.open(project.link, '_blank')
    }
  }
</script>

{#if project}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <!-- eslint-disable-next-line svelte/valid-compile -->
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    on:keydown={handleKeydown}
    on:click={handleBackdropClick}
    role="dialog"
    aria-labelledby="projectTitle"
  >
    <div class="card-bg primary-text border button-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 card-bg border-b button-border px-8 py-6 rounded-t-xl">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h1 id="projectTitle" class="font-custom text-3xl font-bold primary-text mb-2">
              {project.title}
            </h1>
            <div class="flex items-center gap-3">
              <span class="{getStatusClass(project.status)} px-3 py-1 rounded-full text-sm font-medium">
                {project.status || 'No status'}
              </span>
              {#if project.link && project.link !== '#' && project.link !== ''}
                <button
                  on:click={openProjectLink}
                  class="flex items-center gap-2 accent-text hover:underline transition-colors text-sm font-medium"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Project
                </button>
              {/if}
            </div>
          </div>
          <button
            on:click={onClose}
            class="ml-4 secondary-text hover-primary-text card-hover transition-colors p-2 rounded-lg"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-8 py-6 space-y-8">
        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Description</h2>
          <div class="prose prose-themed max-w-none">
            {@html renderedDescription}
          </div>
        </section>

        {#if project.tech && project.tech.length}
          <section>
            <h2 class="font-custom text-xl font-semibold primary-text mb-4">Technologies</h2>
            <div class="flex flex-wrap gap-2">
              {#each project.tech as tech}
                <span class="tech-tag px-2 py-1 rounded text-xs font-medium">{tech}</span>
              {/each}
            </div>
          </section>
        {/if}
      </div>

      <div class="sticky bottom-0 secondary-bg px-8 py-4 rounded-b-xl border-t button-border">
        <div class="flex justify-end gap-3">
          <button
            on:click={onClose}
            class="primary-text border button-border button-hover px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
