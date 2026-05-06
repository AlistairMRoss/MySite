import { writable, derived, type Writable } from 'svelte/store'
import type { Blog } from '@shared-types/index'
import { blogApi, type BlogSummary } from '../api/blog'

interface BlogStoreData {
  blogs: BlogSummary[]
  loading: boolean
  error: string | null
}

const initial: BlogStoreData = {
  blogs: [],
  loading: false,
  error: null
}

function createBlogStore() {
  const { subscribe, update }: Writable<BlogStoreData> = writable(initial)

  return {
    subscribe,

    async loadBlogs(): Promise<void> {
      update(s => ({ ...s, loading: true, error: null }))
      try {
        const blogs = await blogApi.getBlogs()
        update(s => ({ ...s, blogs, loading: false }))
      } catch (err) {
        update(s => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load blogs'
        }))
      }
    },

    async addBlog(blog: Pick<Blog, 'title' | 'content'>): Promise<Blog> {
      const created = await blogApi.addBlog(blog)
      update(s => ({
        ...s,
        blogs: [
          { ...created, preview: created.content.slice(0, 240) } as BlogSummary,
          ...s.blogs
        ]
      }))
      return created
    },

    async removeBlog(blogId: string): Promise<boolean> {
      const ok = await blogApi.deleteBlog(blogId)
      if (ok) {
        update(s => ({ ...s, blogs: s.blogs.filter(b => b.blogId !== blogId) }))
      }
      return ok
    }
  }
}

export const blogStore = createBlogStore()
export const blogs = derived(blogStore, $s => $s.blogs)
export const blogsLoading = derived(blogStore, $s => $s.loading)
