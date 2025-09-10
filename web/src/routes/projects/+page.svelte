<script lang='ts'>
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import type { Project } from '../../../../shared-types/src/index'
  import { authStore } from '$lib/stores/auth'
  
  let isInverted = false
  
  const allProjects: Project[] = [
    {
      projectId: '',
      title: 'string',
      description: 'string',
      tech: ['',''],
      status: '',
      link: '',
      category: ['']
    }
  ]
  
  let selectedCategory = 'All'
  const categories = ['All']
  
  $: filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category[0] === selectedCategory)
  
  const openProject = (link: string) => {
    if (link !== '#') {
      window.open(link, '_blank')
    }
  }
  
  const toggleInvert = () => {
    isInverted = !isInverted
  }
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Live': return 'status-live'
      case 'In Progress': return 'status-progress'
      default: return 'status-complete'
    }
  }

  const handleAddProject = () => {}
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
      
      <div class="flex flex-wrap justify-center gap-4 mb-12" in:fly={{ y: 20, duration: 600, delay: 200 }}>
        {#each categories as category}
          <button
            on:click={() => selectedCategory = category}
            class="{selectedCategory === category ? 'button-hover' : 'primary-text border-2 button-border'} px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
          >
            {category}
          </button>
        {/each}
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project, i}
          <div 
            class="border card-bg card-hover rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
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
                  {project.category}
                </span>
              </div>
              <span class="{getStatusClass(project.status)} text-xs font-medium px-2 py-1 rounded-full">
                {project.status}
              </span>
            </div>
            
            <p class="secondary-text mb-4 leading-relaxed text-sm">{project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tech as tech}
                <span class="tech-tag px-2 py-1 rounded text-xs font-medium">
                  {tech}
                </span>
              {/each}
            </div>
            
            <div class="flex items-center secondary-text text-sm">
              <span>{project.link === '#' ? 'Coming Soon' : 'View Project'}</span>
              {#if project.link !== '#'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>
