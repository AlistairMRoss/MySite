<script lang='ts'>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { marked } from 'marked'
  import { blogApi } from '$lib/api/blog'
  import type { Blog } from '@shared-types/index'

  marked.setOptions({ breaks: true, gfm: true })

  let post: Blog | null = null
  let loading = true
  let error = ''

  $: rendered = post?.content ? marked(post.content) : ''

  onMount(async () => {
    const blogId = $page.params.blogId
    try {
      post = await blogApi.getBlog(blogId)
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load post'
    } finally {
      loading = false
    }
  })

  const formatDate = (iso?: string): string => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }
</script>

<svelte:head>
  <title>{post ? `${post.title} | Alistair Ross` : 'Post'}</title>
</svelte:head>

<div class="min-h-screen primary-bg">
  <header class="secondary-bg p-8">
    <div class="max-w-3xl mx-auto">
      <button
        on:click={() => goto('/blog')}
        class="primary-text button-hover px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>All Posts</span>
      </button>
    </div>
  </header>

  <article class="max-w-3xl mx-auto px-8 py-16">
    {#if loading}
      <div class="flex justify-center items-center min-h-[300px]">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 accent-border"></div>
      </div>
    {:else if error || !post}
      <div class="text-center py-20 secondary-text">
        <p>{error || 'Post not found'}</p>
      </div>
    {:else}
      <div in:fly={{ y: 30, duration: 600 }}>
        <p class="secondary-text text-sm mb-3">{formatDate(post.createdAt)}</p>
        <h1 class="font-custom text-4xl md:text-5xl font-bold primary-text mb-10">{post.title}</h1>
        <div class="prose prose-themed prose-lg max-w-none">
          {@html rendered}
        </div>
      </div>
    {/if}
  </article>
</div>
