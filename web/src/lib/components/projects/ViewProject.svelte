<script lang='ts'>
  import { authStore } from '$lib/stores/auth'
  import type { Project } from '@shared-types/index'

  export let project: Project = {
    projectId: '',
    title: '',
    description: '',
    tech: [''],
    status: '',
    link: '',
    category: ['']
  }
  export let onClose = () => {}
  export let onUpdate = () => {}

  let isEditing = false
  let isSubmitting = false
  let editProject: Project

  $: if (project && !isEditing) {
    editProject = {
      ...project,
      tech: [...(project.tech || [])],
      category: [...(project.category || [])]
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isEditing) {
        cancelEdit()
      } else {
        onClose()
      }
    }
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && !isEditing) {
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

  const startEdit = () => {
    isEditing = true
  }

  const cancelEdit = () => {
    isEditing = false
    editProject = {
      ...project,
      tech: [...(project.tech || [])],
      category: [...(project.category || [])]
    }
  }

  const addTechField = () => {
    editProject.tech = [...editProject.tech, '']
  }

  const removeTechField = (index: number) => {
    if (editProject.tech.length > 1) {
      editProject.tech = editProject.tech.filter((_, i) => i !== index)
    }
  }

  const addCategoryField = () => {
    editProject.category = [...editProject.category, '']
  }

  const removeCategoryField = (index: number) => {
    if (editProject.category.length > 1) {
      editProject.category = editProject.category.filter((_, i) => i !== index)
    }
  }

  const saveEdit = async () => {
    if (isSubmitting) {return}
    
    try {
      isSubmitting = true
      const cleanProject = {
        ...editProject,
        tech: editProject.tech.filter(t => t.trim() !== ''),
        category: editProject.category.filter(c => c.trim() !== '')
      }
      
      if (!cleanProject.title.trim() || !cleanProject.description.trim() || 
        cleanProject.tech.length === 0 || cleanProject.category.length === 0) {
        alert('Please fill in all required fields')
        return
      }
      
      //   await projectStore.updateProject(cleanProject.projectId, cleanProject)
      project = { ...cleanProject }
      isEditing = false
      onUpdate()
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Failed to update project. Please try again.')
    } finally {
      isSubmitting = false
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
            {#if isEditing}
              <input
                type="text"
                bind:value={editProject.title}
                class="text-3xl font-bold text-gray-900 mb-2 w-full bg-transparent border-b-2 border-blue-500 focus:outline-none"
                disabled={isSubmitting}
              />
            {:else}
              <h1 id="projectTitle" class="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
            {/if}
            <div class="flex items-center gap-3">
              {#if isEditing}
                <select
                  bind:value={editProject.status}
                  class="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select status</option>
                  <option value="live">Live</option>
                  <option value="in progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              {:else}
                <span class="{getStatusColor(project.status)} px-3 py-1 rounded-full text-sm font-medium border">
                  {project.status || 'No status'}
                </span>
              {/if}
              {#if !isEditing && project.link && project.link !== '#' && project.link !== ''}
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
          <div class="ml-4 flex items-center gap-2">
            {#if $authStore.isAuthenticated && !isEditing}
              <button
                on:click={startEdit}
                class="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                aria-label="Edit project"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            {/if}
            <button
              on:click={isEditing ? cancelEdit : onClose}
              class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              aria-label={isEditing ? 'Cancel editing' : 'Close modal'}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="px-8 py-6 space-y-8">
        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          {#if isEditing}
            <textarea
              bind:value={editProject.description}
              rows="4"
              class="w-full text-gray-700 leading-relaxed text-lg bg-transparent border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            ></textarea>
          {:else}
            <p class="text-gray-700 leading-relaxed text-lg">
              {project.description}
            </p>
          {/if}
        </section>

        {#if isEditing}
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Project Link</h2>
            <input
              type="url"
              bind:value={editProject.link}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
              disabled={isSubmitting}
            />
          </section>
        {/if}

        {#if (project.tech && project.tech.length > 0) || isEditing}
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
            {#if isEditing}
              {#each editProject.tech as _, index}
                <div class="flex gap-2 mb-2">
                  <input
                    type="text"
                    bind:value={editProject.tech[index]}
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. React, TypeScript"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    on:click={() => removeTechField(index)}
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                    disabled={editProject.tech.length === 1 || isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              {/each}
              <button
                type="button"
                on:click={addTechField}
                class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm disabled:opacity-50"
                disabled={isSubmitting}
              >
                Add Technology
              </button>
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each project.tech as tech}
                  <span class="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200">
                    {tech}
                  </span>
                {/each}
              </div>
            {/if}
          </section>
        {/if}

        {#if (project.category && project.category.length > 0) || isEditing}
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
            {#if isEditing}
              {#each editProject.category as _, index}
                <div class="flex gap-2 mb-2">
                  <input
                    type="text"
                    bind:value={editProject.category[index]}
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Web App, Mobile"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    on:click={() => removeCategoryField(index)}
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                    disabled={editProject.category.length === 1 || isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              {/each}
              <button
                type="button"
                on:click={addCategoryField}
                class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm disabled:opacity-50"
                disabled={isSubmitting}
              >
                Add Category
              </button>
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each project.category as category}
                  <span class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
                    {category}
                  </span>
                {/each}
              </div>
            {/if}
          </section>
        {/if}
      </div>

      <div class="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-xl border-t border-gray-200">
        <div class="flex justify-end gap-3">
          {#if isEditing}
            <button
              on:click={saveEdit}
              class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              {:else}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              {/if}
            </button>
            <button
              on:click={cancelEdit}
              class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          {:else}
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
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
