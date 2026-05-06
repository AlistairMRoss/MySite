<script lang='ts'>
  import { projectStore } from '$lib/stores/projects'
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
  export let onSuccess = () => {}

  let isSubmitting = false
  const editProject: Project = {
    ...project,
    tech: [...(project.tech || [])],
    category: [...(project.category || [])]
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) {
      onClose()
    }
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
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

  const saveProject = async () => {
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
      
      const ok = await projectStore.updateProject(cleanProject)
      if (!ok) {
        alert('Failed to update project. Please try again.')
        return
      }

      onSuccess()
      onClose()
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
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    on:keydown={handleKeydown}
    on:click={handleBackdropClick}
    role="dialog"
    aria-labelledby="editProjectTitle"
  >
    <div class="card-bg primary-text border button-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 card-bg border-b button-border px-8 py-6 rounded-t-xl">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h1 id="editProjectTitle" class="font-custom text-3xl font-bold primary-text mb-4">
              Edit Project
            </h1>
          </div>
          <button
            on:click={onClose}
            class="secondary-text hover-primary-text card-hover transition-colors p-2 rounded-lg"
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-8 py-6 space-y-8">
        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Project Title</h2>
          <input
            type="text"
            bind:value={editProject.title}
            class="themed-input w-full px-3 py-2 border rounded-lg"
            placeholder="Enter project title"
            disabled={isSubmitting}
          />
        </section>

        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Status</h2>
          <select
            bind:value={editProject.status}
            class="themed-input w-full px-3 py-2 border rounded-lg"
            disabled={isSubmitting}
          >
            <option value="">Select status</option>
            <option value="live">Live</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          {#if editProject.status}
            <div class="mt-2">
              <span class="{getStatusClass(editProject.status)} px-3 py-1 rounded-full text-sm font-medium inline-block">
                {editProject.status}
              </span>
            </div>
          {/if}
        </section>

        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Description</h2>
          <textarea
            bind:value={editProject.description}
            rows="6"
            class="themed-input w-full px-3 py-2 border rounded-lg font-mono text-sm"
            placeholder="Describe your project (markdown supported)…"
            disabled={isSubmitting}
          ></textarea>
        </section>

        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Project Link</h2>
          <input
            type="url"
            bind:value={editProject.link}
            class="themed-input w-full px-3 py-2 border rounded-lg"
            placeholder="https://..."
            disabled={isSubmitting}
          />
        </section>

        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Technologies Used</h2>
          {#each editProject.tech as _, index}
            <div class="flex gap-2 mb-2">
              <input
                type="text"
                bind:value={editProject.tech[index]}
                class="themed-input flex-1 px-3 py-2 border rounded-lg"
                placeholder="e.g. React, TypeScript"
                disabled={isSubmitting}
              />
              <button
                type="button"
                on:click={() => removeTechField(index)}
                class="px-3 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg disabled:opacity-50"
                disabled={editProject.tech.length === 1 || isSubmitting}
              >
                Remove
              </button>
            </div>
          {/each}
          <button
            type="button"
            on:click={addTechField}
            class="accent-bg accent-hover-bg text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
            disabled={isSubmitting}
          >
            Add Technology
          </button>
        </section>

        <section>
          <h2 class="font-custom text-xl font-semibold primary-text mb-4">Categories</h2>
          {#each editProject.category as _, index}
            <div class="flex gap-2 mb-2">
              <input
                type="text"
                bind:value={editProject.category[index]}
                class="themed-input flex-1 px-3 py-2 border rounded-lg"
                placeholder="e.g. Web App, Mobile"
                disabled={isSubmitting}
              />
              <button
                type="button"
                on:click={() => removeCategoryField(index)}
                class="px-3 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg disabled:opacity-50"
                disabled={editProject.category.length === 1 || isSubmitting}
              >
                Remove
              </button>
            </div>
          {/each}
          <button
            type="button"
            on:click={addCategoryField}
            class="accent-bg accent-hover-bg text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
            disabled={isSubmitting}
          >
            Add Category
          </button>
        </section>
      </div>

      <div class="sticky bottom-0 secondary-bg px-8 py-4 rounded-b-xl border-t button-border">
        <div class="flex justify-end gap-3">
          <button
            on:click={saveProject}
            class="accent-bg accent-hover-bg text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
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
            on:click={onClose}
            class="primary-text border button-border button-hover px-6 py-2 rounded-lg transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
