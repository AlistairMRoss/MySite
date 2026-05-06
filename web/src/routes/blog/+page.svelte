<script lang='ts'>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { authStore } from '$lib/stores/auth'
  import { blogStore, blogs, blogsLoading } from '$lib/stores/blog'
  import AddBlog from '$lib/components/blog/AddBlog.svelte'
  import SubscribeForm from '$lib/components/blog/SubscribeForm.svelte'

  let showAddModal = false

  onMount(() => {
    blogStore.loadBlogs()
  })

  const formatDate = (iso?: string): string => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleDelete = async (blogId: string, e: Event) => {
    e.stopPropagation()
    if (!confirm('Delete this post?')) return
    try {
      await blogStore.removeBlog(blogId)
    } catch (err) {
      console.error(err)
      alert('Failed to delete')
    }
  }
</script>

<svelte:head>
  <title>Blog | Alistair Ross</title>
  <meta name="description" content="Writing and notes from Alistair Ross." />
</svelte:head>

<div class="min-h-screen primary-bg">
  <header class="secondary-bg p-8">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <button
        on:click={() => goto('/')}
        class="primary-text button-hover px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </button>

      {#if $authStore.isAuthenticated}
        <button
          on:click={() => showAddModal = true}
          class="primary-text button-hover border button-border px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-sm font-medium">New Post</span>
        </button>
      {/if}
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-8 pt-12 pb-20">
    <div class="text-center mb-12" in:fly={{ y: 30, duration: 600 }}>
      <span class="eyebrow mb-4">Writing</span>
      <h1 class="font-custom text-4xl md:text-5xl font-bold primary-text mb-4 mt-4">Blog</h1>
      <p class="secondary-text text-lg">Notes, thoughts, and the occasional rant.</p>
    </div>

    {#if $blogsLoading}
      <div class="flex justify-center items-center min-h-[300px]">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 accent-border"></div>
      </div>
    {:else if $blogs.length === 0}
      <div class="text-center py-20 secondary-text">
        <p>No posts yet. Check back soon.</p>
      </div>
    {:else}
      <div class="space-y-4 mb-16">
        {#each $blogs as post, i (post.blogId)}
          <article
            class="card-bg card-hover border button-border rounded-xl p-6 md:p-8 transition-all duration-300 cursor-pointer relative group"
            in:fly={{ y: 30, duration: 500, delay: i * 80 }}
            on:click={() => goto(`/blog/${post.blogId}`)}
            on:keydown={(e) => e.key === 'Enter' && goto(`/blog/${post.blogId}`)}
            role="button"
            tabindex="0"
          >
            <div class="flex items-start justify-between gap-4 mb-2">
              <h2 class="font-custom text-xl md:text-2xl font-bold primary-text flex-1">{post.title}</h2>
              {#if $authStore.isAuthenticated}
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                  class="opacity-0 group-hover:opacity-100 bg-red-500/90 hover:bg-red-500 text-white p-1.5 rounded-full transition-all duration-300"
                  on:click={(e) => handleDelete(String(post.blogId), e)}
                  title="Delete post"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              {/if}
            </div>
            <p class="secondary-text text-sm mb-3">{formatDate(post.createdAt)}</p>
            <p class="secondary-text leading-relaxed">{post.preview}{post.preview.length >= 240 ? '…' : ''}</p>
          </article>
        {/each}
      </div>
    {/if}

    <SubscribeForm />
  </main>
</div>

{#if showAddModal}
  <AddBlog
    onClose={() => showAddModal = false}
    onSuccess={() => {}}
  />
{/if}
