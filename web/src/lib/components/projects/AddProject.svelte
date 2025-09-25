<script lang='ts'>
  import { projectStore } from '$lib/stores/projects'

  export let onClose = () => {}
  export let onSuccess = () => {}

  let isSubmitting = false

  const newProject = {
    title: '',
    description: '',
    tech: [''],
    status: '',
    link: '',
    category: ['']
  }

  const addTechField = () => {
    newProject.tech = [...newProject.tech, '']
  }

  const removeTechField = (index: number) => {
    if (newProject.tech.length > 1) {
      newProject.tech = newProject.tech.filter((_, i) => i !== index)
    }
  }

  const addCategoryField = () => {
    newProject.category = [...newProject.category, '']
  }

  const removeCategoryField = (index: number) => {
    if (newProject.category.length > 1) {
      newProject.category = newProject.category.filter((_, i) => i !== index)
    }
  }

  const closeModal = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    newProject.title = ''
    newProject.description = ''
    newProject.tech = ['']
    newProject.status = ''
    newProject.link = ''
    newProject.category = ['']
  }

  const submitProject = async () => {
    if (isSubmitting) {return}
    
    try {
      isSubmitting = true
      const cleanProject = {
        ...newProject,
        tech: newProject.tech.filter(t => t.trim() !== ''),
        category: newProject.category.filter(c => c.trim() !== '')
      }
      
      if (!cleanProject.title.trim() || !cleanProject.description.trim() || 
        cleanProject.tech.length === 0 || cleanProject.category.length === 0) {
        alert('Please fill in all required fields')
        return
      }
      
      await projectStore.addProject(cleanProject)
      onSuccess() // Notify parent of success
      closeModal() // Close the modal
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    } finally {
      isSubmitting = false
    }
  }

  // Handle escape key and backdrop clicks
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  role="button"
  tabindex="0"
  aria-label="Close modal background"
  on:keydown={handleKeydown}
  on:click={handleBackdropClick}
>
  <div
    class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
    role="application"
    aria-labelledby="addProjectTitle"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 id="addProjectTitle" class="text-2xl font-bold text-gray-800">
        Add New Project
      </h2>
      <button
        type="button"
        on:click={closeModal}
        class="text-gray-500 hover:text-gray-700"
        aria-label="Close modal"
        disabled={isSubmitting}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <form on:submit|preventDefault={submitProject} class="space-y-4">
      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          bind:value={newProject.title}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          bind:value={newProject.description}
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          bind:value={newProject.status}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          <option value="">Select status</option>
          <option value="live">Live</option>
          <option value="in progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
        <input
          type="url"
          bind:value={newProject.link}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
          disabled={isSubmitting}
        />
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Technologies *</label>
        {#each newProject.tech as _, index}
          <div class="flex gap-2 mb-2">
            <input
              type="text"
              bind:value={newProject.tech[index]}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. React, TypeScript"
              disabled={isSubmitting}
            />
            <button
              type="button"
              on:click={() => removeTechField(index)}
              class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={newProject.tech.length === 1 || isSubmitting}
            >
              Remove
            </button>
          </div>
        {/each}
        <button
          type="button"
          on:click={addTechField}
          class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm disabled:opacity-50"
          disabled={isSubmitting}
        >
          Add Technology
        </button>
      </div>

      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <!-- eslint-disable-next-line svelte/valid-compile -->
        <label class="block text-sm font-medium text-gray-700 mb-1">Categories *</label>
        {#each newProject.category as _, index}
          <div class="flex gap-2 mb-2">
            <input
              type="text"
              bind:value={newProject.category[index]}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Web App, Mobile"
              disabled={isSubmitting}
            />
            <button
              type="button"
              on:click={() => removeCategoryField(index)}
              class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={newProject.category.length === 1 || isSubmitting}
            >
              Remove
            </button>
          </div>
        {/each}
        <button
          type="button"
          on:click={addCategoryField}
          class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm disabled:opacity-50"
          disabled={isSubmitting}
        >
          Add Category
        </button>
      </div>

      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding Project...
          {:else}
            Add Project
          {/if}
        </button>
        <button
          type="button"
          on:click={closeModal}
          class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
