import type { Project } from '@shared-types/index'
import { API_V1 } from './config'
import { authStore } from '$lib/stores/auth'
import { get } from 'svelte/store'

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    try {
      const result = await fetch(`${API_V1}/projects`, {
        method: 'GET',
      })
      
      const respObj = await result.json()
      console.log(respObj)
      return respObj.result as Project[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('There was an error getting projects: ', err)
      throw new Error(err)
    }
  },

  async addProject(project: Project): Promise<boolean> {
    try {
      const authState = get(authStore)
      const accessToken = authState.accessToken
      console.log(project)
      // I will add the logic for this later
      return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      throw new Error(err)
    }
  }
}
