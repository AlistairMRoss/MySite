<script lang='ts'>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { authStore } from '$lib/stores/auth'
  import { projectStore, projects, projectsLoading } from '$lib/stores/projects'
  
  let isInverted = false
  let selectedCategory = 'All'
  let allCategories: string[] = ['All']
  let showAddModal = false
  let isSubmitting = false
  let newProject = {
    title: '',
    description: '',
    tech: [''],
    status: '',
    link: '',
    category: ['']
  }
  
  onMount(() => {
    projectStore.loadProjects()
  })
  
  $: allCategories = ['All', ...new Set($projects.reduce((acc: string[], project) => [...acc, ...project.category], []))]
  
  $: filteredProjects = selectedCategory === 'All' 
    ? $projects 
    : $projects.filter(project => project.category.includes(selectedCategory))
  
  const openProject = (link: string) => {
    if (link !== '#' && link !== '') {
      window.open(link.startsWith('http') ? link : `https://${link}`, '_blank')
    }
  }
  
  const toggleInvert = () => {
    isInverted = !isInverted
  }
  
  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'live': return 'status-live'
      case 'in progress': return 'status-progress'
      default: return 'status-complete'
    }
  }

  const handleAddProject = async () => {
    showAddModal = true
  }

  const closeModal = () => {
    showAddModal = false
    isSubmitting = false
    newProject = {
      title: '',
      description: '',
      tech: [''],
      status: '',
      link: '',
      category: ['']
    }
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
      closeModal()
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    } finally {
      isSubmitting = false
    }
  }

  const deleteProject = async (projectId: string, event: Event) => {
    event.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }
    
    try {
    // await projectStore.deleteProject(projectId)s
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project. Please try again.')
    }
  }

  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.substring(0, 100) + '...' : description
  }
</script>

<svelte:head>
  <title>Projects | Your Name</title>
  <meta name="description" content="A collection of my development projects and experiments." />
</svelte:head>

<div class="min-h-screen primary-bg {isInverted ? 'inverted' : ''}">
  <header class="relative primary-bg p-8">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <button
        on:click={() => goto('/')}
        class="primary-text button-hover px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </button>
      
      <div class="flex items-center space-x-4">
        {#if $authStore.isAuthenticated}
          <button
            on:click={handleAddProject}
            class="primary-text button-hover border-2 button-border px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-sm font-medium">Add Project</span>
          </button>
        {/if}
        
        <button
          on:click={toggleInvert}
          class="primary-text button-hover border-2 button-border px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span class="text-sm font-medium">Invert</span>
        </button>
      </div>
    </div>
  </header>

  <main class="secondary-bg min-h-screen pt-8 pb-16">
    <div class="max-w-6xl mx-auto px-8">
      <div class="text-center mb-12" in:fly={{ y: 30, duration: 600 }}>
        <h1 class="text-4xl md:text-5xl font-bold primary-text mb-4">All Projects</h1>
        <p class="text-xl secondary-text">A collection of things I've built and experimented with</p>
      </div>
      
      {#if $projectsLoading}
        <div class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
        </div>
      {:else}
        <div class="flex flex-wrap justify-center gap-4 mb-12" in:fly={{ y: 20, duration: 600, delay: 200 }}>
          {#each allCategories as category}
            <button
              on:click={() => selectedCategory = category}
              class="{selectedCategory === category ? 'bg-blue-500 text-white border-2 border-blue-500' : 'primary-text border-2 button-border hover:bg-blue-50'} px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
            >
              {category}
            </button>
          {/each}
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredProjects as project, i}
            <div 
              class="border card-bg card-hover rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer relative group"
              in:fly={{ y: 50, duration: 600, delay: i * 100 }}
              on:click={() => openProject(project.link)}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && openProject(project.link)}
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="primary-text text-xl font-bold mb-2">{project.title}</h3>
                  <span class="category-tag px-2 py-1 rounded-full text-xs font-medium">
                    {project.category[0]}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="{getStatusClass(project.status)} text-xs font-medium px-2 py-1 rounded-full">
                    {project.status}
                  </span>
                  {#if $authStore.isAuthenticated}
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button
                      class="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-300 z-10"
                      on:click={(e) => deleteProject(String(project.projectId), e)}
                      title="Delete project"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  {/if}
                </div>
              </div>

              
              <p class="secondary-text mb-4 leading-relaxed text-sm">{truncateDescription(project.description)}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                {#each project.tech as tech}
                  <span class="tech-tag px-2 py-1 rounded text-xs font-medium">
                    {tech}
                  </span>
                {/each}
              </div>
              
              <div class="flex items-center secondary-text text-sm">
                <span>{project.link === '#' || project.link === '' ? 'Coming Soon' : 'View Project'}</span>
                {#if project.link !== '#' && project.link !== ''}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>
</div>

{#if showAddModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    role="button"
    tabindex="0"
    aria-label="Close modal background"
    on:keydown={(e) =>
      (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')
    }
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
{/if}
