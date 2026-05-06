import type { Blog } from '@shared-types/index'
import { API_V1 } from './config'
import { authStore } from '$lib/stores/auth'
import { get } from 'svelte/store'

export interface BlogSummary extends Omit<Blog, 'content'> {
  preview: string
}

export const blogApi = {
  async getBlogs(): Promise<BlogSummary[]> {
    const res = await fetch(`${API_V1}/blogs`)
    if (!res.ok) throw new Error('Failed to load blogs')
    const data = await res.json()
    return data.result as BlogSummary[]
  },

  async getBlog(blogId: string): Promise<Blog> {
    const res = await fetch(`${API_V1}/blog/${blogId}`)
    if (!res.ok) throw new Error('Failed to load blog')
    const data = await res.json()
    return data.result as Blog
  },

  async addBlog(blog: Pick<Blog, 'title' | 'content'>): Promise<Blog> {
    const accessToken = get(authStore).accessToken
    const res = await fetch(`${API_V1}/blogs/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blog })
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Failed to add blog')
    }
    const data = await res.json()
    return data.result as Blog
  },

  async deleteBlog(blogId: string): Promise<boolean> {
    const accessToken = get(authStore).accessToken
    const res = await fetch(`${API_V1}/blog/${blogId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return res.ok
  }
}
