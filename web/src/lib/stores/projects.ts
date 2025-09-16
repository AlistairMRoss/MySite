import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { Project } from '@shared-types/index'
import { projectApi } from '../api/projects'

interface ProjectStoreData {
  projects: Project[]
  loading: boolean
  error: string | null
}

interface ProjectStore {
  subscribe: Writable<ProjectStoreData>['subscribe']
  loadProjects(): Promise<void>
  addProject(projectData?: Partial<Project>): Promise<Project>
  updateProject(updatedProject: Project): void
  removeProject(projectId: string | number): void
  clearError(): void
  reset(): void
}

const initialState: ProjectStoreData = {
  projects: [],
  loading: false,
  error: null
}

function createProjectStore(): ProjectStore {
  const { subscribe, set, update } = writable<ProjectStoreData>(initialState)

  return {
    subscribe,
    
    async loadProjects(): Promise<void> {
      update(state => ({ ...state, loading: true, error: null }))
      
      try {
        const response = await projectApi.getProjects()
        update(state => ({
          ...state,
          projects: response,
          loading: false,
          error: null
        }))
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load projects'
        }))
      }
    },

    async addProject(projectData: Project): Promise<Project> {
      update(state => ({ ...state, loading: true, error: null }))
      
      try {
        const newProject = await projectApi.addProject(projectData)
        if (newProject) {
          update(state => ({
            ...state,
            projects: [...state.projects, projectData],
            loading: false,
            error: null
          }))
        } 
        return projectData
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to add project'
        }))
        throw error
      }
    },

    updateProject(updatedProject: Project): void {
      update(state => ({
        ...state,
        projects: state.projects.map(project => 
          project.projectId === updatedProject.projectId ? updatedProject : project
        )
      }))
    },

    removeProject(projectId: string | number): void {
      update(state => ({
        ...state,
        projects: state.projects.filter(project => project.projectId !== projectId)
      }))
    },

    clearError(): void {
      update(state => ({ ...state, error: null }))
    },

    reset(): void {
      set(initialState)
    }
  }
}

export const projectStore = createProjectStore()

export const projects = derived(projectStore, $store => $store.projects)
export const projectsLoading = derived(projectStore, $store => $store.loading)
export const projectsError = derived(projectStore, $store => $store.error)

export const getProjectById = (id: string | number): Readable<Project | undefined> => 
  derived(projects, $projects => $projects.find(project => project.projectId === id))
