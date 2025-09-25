<script lang='ts'>
  export let project
  export let onClose = () => {}

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

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'live': return 'bg-green-100 text-green-800 border-green-200'
      case 'complete': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    on:keydown={handleKeydown}
    on:click={handleBackdropClick}
    role="dialog"
    aria-labelledby="projectTitle"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h1 id="projectTitle" class="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h1>
            <div class="flex items-center gap-3">
              <span class="{getStatusColor(project.status)} px-3 py-1 rounded-full text-sm font-medium border">
                {project.status || 'No status'}
              </span>
              {#if project.link && project.link !== '#' && project.link !== ''}
                <button
                  on:click={openProjectLink}
                  class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
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
            class="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
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
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p class="text-gray-700 leading-relaxed text-lg">
            {project.description}
          </p>
        </section>

        {#if project.tech && project.tech.length > 0}
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
            <div class="flex flex-wrap gap-2">
              {#each project.tech as tech}
                <span class="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200">
                  {tech}
                </span>
              {/each}
            </div>
          </section>
        {/if}

        {#if project.category && project.category.length > 0}
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
            <div class="flex flex-wrap gap-2">
              {#each project.category as category}
                <span class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
                  {category}
                </span>
              {/each}
            </div>
          </section>
        {/if}
      </div>

      <div class="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-xl border-t border-gray-200">
        <div class="flex justify-end gap-3">
          {#if project.link && project.link !== '#' && project.link !== ''}
            <button
              on:click={openProjectLink}
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Project
            </button>
          {/if}
          <button
            on:click={onClose}
            class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
