<script lang='ts'>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { authStore } from '$lib/stores/auth'
  import { projectStore, projects, projectsLoading } from '$lib/stores/projects'
  import AddProject from '$lib/components/projects/AddProject.svelte'
  import ViewProject from '$lib/components/projects/ViewProject.svelte'
  import type { Project } from '@shared-types/index'
  
  let isInverted = false
  let selectedCategory = 'All'
  let allCategories: string[] = ['All']
  let showAddModal = false
  let viewProject = false
  let selectedProject: Project
  
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

  const handleViewProject = async (projectId: string) => {
    console.log('I want to see a project: ', projectId)
    selectedProject = filteredProjects.find(project => project.projectId === projectId) as Project
    console.log('this is the project: ', selectedProject)
    viewProject = true
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
  <title>Projects | Alistair Ross</title>
  <meta name="description" content="A collection of my development projects and experiments." />
</svelte:head>

<div class="min-h-screen primary-bg {isInverted ? 'inverted' : ''}">
  <header class="relative secondary-bg p-8">
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
              on:click={() => handleViewProject((project.projectId) as string)}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && handleViewProject((project.projectId) as string)}
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
              
              <div class="flex items-center secondary-text text-sm"
                on:click={() => openProject(project.link)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && openProject(project.link)}>
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
  <AddProject 
    onClose={() => showAddModal = false}
    onSuccess={() => {
      console.log('Project added successfully!')
    }}
  />
{/if}

{#if viewProject}
  <ViewProject
    project={selectedProject}
    onClose={() => viewProject = false}
  />
{/if}
