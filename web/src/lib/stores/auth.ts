import { writable, type Writable } from 'svelte/store'
import { authApi } from '$lib/api/auth'
import type { AuthState, LoginCredentials } from '@shared-types/auth'

interface AuthStore {
  subscribe: Writable<AuthState>['subscribe']
  login(credentials: LoginCredentials): Promise<boolean>
  logout(): void
}

const initialState: AuthState = {
  apiKey: null,
  refreshToken: null,
  isAuthenticated: false
}

function createAuthStore(): AuthStore {
  const { subscribe, set } = writable<AuthState>(initialState)

  return {
    subscribe,

    async login(credentials: LoginCredentials): Promise<boolean> {
      try {
        const result = await authApi.login(credentials)
      
        set({
          apiKey: result.apiKey,
          refreshToken: result.refreshToken,
          isAuthenticated: true
        })

        return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        throw new Error('Error logging in ', err)
      }
    },

    logout(): void {
      set(initialState)
    }
  }
}

export const authStore = createAuthStore()
