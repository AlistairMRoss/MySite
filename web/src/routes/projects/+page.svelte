<script lang='ts'>
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import type { Project } from '../../../../shared-types/src/index'
  
  let isInverted = false
  
  $: primaryBg = isInverted ? 'bg-white' : 'bg-black'
  $: secondaryBg = isInverted ? 'bg-neutral-50' : 'bg-neutral-900'
  $: primaryText = isInverted ? 'text-black' : 'text-white'
  $: secondaryText = isInverted ? 'text-neutral-600' : 'text-neutral-300'
  $: buttonHoverBg = isInverted ? 'hover:bg-black' : 'hover:bg-white'
  $: buttonHoverText = isInverted ? 'hover:text-white' : 'hover:text-black'
  $: buttonBorder = isInverted ? 'border-black' : 'border-white'
  $: cardBg = isInverted ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-700'
  $: cardHover = isInverted ? 'hover:bg-neutral-50' : 'hover:bg-neutral-800'
  
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
  const categories = ['All', 'Full Stack', 'Frontend', 'AI/ML', 'Mobile', 'Tools', 'Blockchain']
  
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
</script>

<svelte:head>
  <title>Projects | Your Name</title>
  <meta name="description" content="A collection of my development projects and experiments." />
</svelte:head>

<div class="min-h-screen {primaryBg}">
  <header class="relative {primaryBg} p-8">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <button
        on:click={() => goto('/')}
        class="{primaryText} {buttonHoverBg} {buttonHoverText} px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </button>
      
      <button
        on:click={toggleInvert}
        class="{primaryText} {buttonHoverBg} {buttonHoverText} border-2 {buttonBorder} px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        <span class="text-sm font-medium">Invert</span>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="{secondaryBg} min-h-screen pt-8 pb-16">
    <div class="max-w-6xl mx-auto px-8">
      <div class="text-center mb-12" in:fly={{ y: 30, duration: 600 }}>
        <h1 class="text-4xl md:text-5xl font-bold {primaryText} mb-4">All Projects</h1>
        <p class="text-xl {secondaryText}">A collection of things I've built and experimented with</p>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12" in:fly={{ y: 20, duration: 600, delay: 200 }}>
        {#each categories as category}
          <button
            on:click={() => selectedCategory = category}
            class="{selectedCategory === category ? `${buttonHoverBg} ${buttonHoverText}` : `${primaryText} border-2 ${buttonBorder}`} px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
          >
            {category}
          </button>
        {/each}
      </div>
      
      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project, i}
          <div 
            class="border {cardBg} {cardHover} rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
            in:fly={{ y: 50, duration: 600, delay: i * 100 }}
            on:click={() => openProject(project.link)}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && openProject(project.link)}
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="{primaryText} text-xl font-bold mb-2">{project.title}</h3>
                <span class="{isInverted ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-200'} px-2 py-1 rounded-full text-xs font-medium">
                  {project.category}
                </span>
              </div>
              <span class="{project.status === 'Live' ? 'text-green-500 bg-green-100' : project.status === 'In Progress' ? 'text-yellow-500 bg-yellow-100' : 'text-purple-500 bg-purple-100'} text-xs font-medium px-2 py-1 rounded-full {project.status === 'Live' ? (isInverted ? 'bg-green-100' : 'bg-green-900') : project.status === 'In Progress' ? (isInverted ? 'bg-yellow-100' : 'bg-yellow-900') : (isInverted ? 'bg-purple-100' : 'bg-purple-900')}">
                {project.status}
              </span>
            </div>
            
            <p class="{secondaryText} mb-4 leading-relaxed text-sm">{project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tech as tech}
                <span class="{isInverted ? 'bg-neutral-200 text-neutral-700' : 'bg-neutral-700 text-neutral-200'} px-2 py-1 rounded text-xs font-medium">
                  {tech}
                </span>
              {/each}
            </div>
            
            <div class="flex items-center {secondaryText} text-sm">
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
