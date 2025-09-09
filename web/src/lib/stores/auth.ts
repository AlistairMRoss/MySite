import { writable, type Writable } from 'svelte/store'
import { authApi } from '$lib/api/auth'
import type { AuthState } from '@shared-types/auth'

interface AuthStore {
  subscribe: Writable<AuthState>['subscribe']
  startAuthFlow(): void
  handleAuthCallback(code: string): Promise<boolean>
  logout(): void
}

const initialState: AuthState = {
  apiKey: null,
  refreshToken: null,
  accessToken: null,
  idToken: null,
  isAuthenticated: false
}

function createAuthStore(): AuthStore {
  const { subscribe, set } = writable<AuthState>(initialState)

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth_state')
    if (stored) {
      try {
        const parsedState = JSON.parse(stored)
        set(parsedState)
      } catch (e) {
        console.error('Error parsing stored auth state:', e)
      }
    }
  }

  return {
    subscribe,

    startAuthFlow(): void {
      authApi.startAuthFlow()
    },

    async handleAuthCallback(code: string): Promise<boolean> {
      try {
        const tokenResponse = await authApi.exchangeCodeForTokens(code)
        

        const newState: AuthState = {
          apiKey: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          accessToken: tokenResponse.access_token,
          idToken: tokenResponse.id_token,
          isAuthenticated: true
        }

        set(newState)
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_state', JSON.stringify(newState))
        }

        return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Auth callback error:', err)
        throw new Error(`Authentication failed: ${err.message}`)
      }
    },

    logout(): void {
      set(initialState)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_state')
      }
    }
  }
}

export const authStore = createAuthStore()
