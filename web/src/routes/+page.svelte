<script lang='ts'>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { authStore } from '$lib/stores/auth'

  let showWelcome = false
  let showNavigation = false
  let showSocialLinks = false
  let showInvertButton = false
  let isInverted = false
  let showEmailCopied = false
  
  let clickCount = 0
  let firstClickTime = 0

  const smoothScrollTo = (elementId: string): void => {
    const element = document.getElementById(elementId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const downloadResume = (): void => {
    const link = document.createElement('a')
    link.href = '/path-to-your-resume.pdf'
    link.download = 'Your_Name_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyEmailToClipboard = (): void => {
    const email = 'your.email@example.com'
    navigator.clipboard.writeText(email).then(() => {
      showEmailCopied = true
      setTimeout(() => {
        showEmailCopied = false
      }, 2000)
    })
  }

  const openGithub = (): void => {
    window.open('https://github.com/yourusername', '_blank')
  }

  const openLinkedIn = (): void => {
    window.open('https://linkedin.com/in/yourusername', '_blank')
  }

  const toggleInvert = (): void => {
    isInverted = !isInverted
    showWelcome = false
    showNavigation = false
    showSocialLinks = false
    showInvertButton = false

    setTimeout(() => {
      showWelcome = true
    }, 100)

    setTimeout(() => {
      showNavigation = true
    }, 800)

    setTimeout(() => {
      showSocialLinks = true
    }, 1000)

    setTimeout(() => {
      showInvertButton = true
    }, 1200)
  }

  const handleWelcomeClick = (): void => {
    const currentTime = Date.now()
  
    if (currentTime - firstClickTime > 5000) {
      clickCount = 1
      firstClickTime = currentTime
    } else {
      clickCount++
    }
  
    if (clickCount === 5) {
      authStore.startAuthFlow() // Direct redirect to OpenAuth
      clickCount = 0 
      firstClickTime = 0
    }
  }

  onMount(() => {
    setTimeout(() => {
      showWelcome = true
    }, 300)

    setTimeout(() => {
      showNavigation = true
    }, 1000)

    setTimeout(() => {
      showSocialLinks = true
    }, 1200)

    setTimeout(() => {
      showInvertButton = true
    }, 1400)
  })

  $: primaryBg = isInverted ? 'bg-white' : 'bg-black'
  $: secondaryBg = isInverted ? 'bg-neutral-50' : 'bg-neutral-900'
  $: tertiaryBg = isInverted ? 'bg-stone-50' : 'bg-black'
  $: primaryText = isInverted ? 'text-black' : 'text-white'
  $: secondaryText = isInverted ? 'text-neutral-600' : 'text-neutral-300'
  $: buttonHoverBg = isInverted ? 'hover:bg-black' : 'hover:bg-white'
  $: buttonHoverText = isInverted ? 'hover:text-white' : 'hover:text-black'
  $: buttonBorder = isInverted ? 'border-black' : 'border-white'
  $: underlineColor = isInverted ? 'bg-black' : 'bg-white'
  $: socialHoverBg = isInverted ? 'hover:bg-neutral-100' : 'hover:bg-neutral-800'
</script>

{#if showEmailCopied}
  <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 {isInverted ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900 text-green-100 border-green-800'} border px-4 py-2 rounded-lg shadow-lg"
    in:fly={{ y: -50, duration: 300 }}
    out:fly={{ y: -50, duration: 300 }}>
    {$authStore.isAuthenticated ? 'Admin access granted!' : 'Email address copied to clipboard!'}
  </div>
{/if}

<section class="welcome-section {primaryBg} min-h-screen flex flex-col items-center justify-center p-8 relative">
  {#if showWelcome}
    <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
    <!-- eslint-disable-next-line svelte/valid-compile -->
    <h1 
      class="welcome-text {primaryText} text-4xl md:text-6xl font-bold mb-12 text-center cursor-pointer select-none user-select-none" 
      in:fly={{ y: 50, duration: 800, delay: 200 }}
      on:click={handleWelcomeClick}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Enter' && handleWelcomeClick()}
    >
      Hi, Welcome to my page
    </h1>
  {/if}

  {#if showNavigation}
    <div class="flex justify-center w-full mb-8" in:fly={{ y: 30, duration: 600, delay: 400 }}>
      <nav>
        <ul class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
          <li>
            <button
              on:click={() => smoothScrollTo('about')}
              class="group relative {primaryText} text-2xl font-bold py-4 px-8 {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              About Me
              <span class="absolute bottom-0 left-0 w-0 h-0.5 {underlineColor} group-hover:w-full transition-all duration-300"></span>
            </button>
          </li>
          <li>
            <button
              on:click={() => smoothScrollTo('projects')}
              class="group relative {primaryText} text-2xl font-bold py-4 px-8 {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Things I've Done
              <span class="absolute bottom-0 left-0 w-0 h-0.5 {underlineColor} group-hover:w-full transition-all duration-300"></span>
            </button>
          </li>
          <li>
            <button
              on:click={() => smoothScrollTo('blog')}
              class="group relative {primaryText} text-2xl font-bold py-4 px-8 {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              I Write Here Sometimes
              <span class="absolute bottom-0 left-0 w-0 h-0.5 {underlineColor} group-hover:w-full transition-all duration-300"></span>
            </button>
          </li>
          <li>
            <button
              on:click={downloadResume}
              class="group relative {primaryText} text-2xl font-bold py-4 px-8 {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 {underlineColor} group-hover:w-full transition-all duration-300"></span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  {/if}

  {#if showSocialLinks}
    <div class="flex justify-center space-x-6" in:fly={{ y: 20, duration: 500, delay: 200 }}>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        on:click={openGithub}
        class="{primaryText} {socialHoverBg} p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        title="GitHub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </button>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        on:click={openLinkedIn}
        class="{primaryText} {socialHoverBg} p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        title="LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        on:click={copyEmailToClipboard}
        class="{primaryText} {socialHoverBg} p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        title="Email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  {/if}

  {#if showInvertButton}
    <button
      on:click={toggleInvert}
      class="absolute top-8 right-8 {primaryText} {buttonHoverBg} {buttonHoverText} border-2 {buttonBorder} px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-2"
      in:fly={{ x: 50, duration: 400, delay: 200 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
      <span class="text-sm font-medium">Invert</span>
    </button>
  {/if}
</section>

<section class="min-h-screen {secondaryBg} p-8 pt-20">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold {primaryText} mb-8" id="about">About Me</h2>
    <p class="{primaryText} text-lg leading-relaxed">Your about content goes here...</p>
  </div>
</section>

<section class="py-40 {tertiaryBg}">
  <div class="max-w-4xl mx-auto text-center px-8">
    <h2 class="text-3xl md:text-4xl font-bold {primaryText} mb-6" id="projects">Things I've Done</h2>
    <p class="text-lg {secondaryText} mb-8">
      I can't promise much from this
    </p>
    <div class="text-center" in:fly={{ y: 30, duration: 600, delay: 600 }}>
      <button
        class="group relative {primaryText} border-2 {buttonBorder} px-6 py-3 rounded-lg {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
        on:click={() => goto('/projects')}
      >
        <span class="text-lg font-medium">Explore All Projects</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>
</section>

<section class="py-40 {secondaryBg}">
  <div class="max-w-4xl mx-auto text-center px-8">
    <h2 class="text-3xl md:text-4xl font-bold {primaryText} mb-6" id="blog">I Write Here Sometimes</h2>
    <p class="text-lg {secondaryText} mb-8">
      I try write whats on my mind sometimes... I can't promise its any good
    </p>
    <button
      class="group relative {primaryText} border-2 {buttonBorder} px-6 py-3 rounded-lg {buttonHoverBg} {buttonHoverText} transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
      on:click={() => window.location.href = '/blog'}
    >
      <span class="text-lg font-medium">Read My Posts</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
</section>
