import { writable, type Writable } from 'svelte/store'
import { authApi } from '$lib/api/auth'
import type { AuthState } from '@shared-types/auth'

interface AuthStore {
  subscribe: Writable<AuthState>['subscribe']
  startAuthFlow(): Promise<void>
  handleAuthCallback(code: string): Promise<boolean>
  verifyTokens(token: string): Promise<boolean>
  logout(): void
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  expiry: 0,
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
    async startAuthFlow(): Promise<void> {
      await authApi.startAuthFlow()
    },

    async handleAuthCallback(code: string): Promise<boolean> {
      try {
        console.log('this is the code ', code)
        const tokenResponse = await authApi.exchangeCodeForTokens(code)

        const newState: AuthState = {
          refreshToken: tokenResponse.tokens.refresh,
          accessToken: tokenResponse.tokens.access,
          expiry: tokenResponse.tokens.expiresIn + Date.now(),
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

    async verifyTokens(token: string): Promise<boolean> {
      try {
        await authApi.verifyTokens(token)
        return true
      } catch (err: any) {
        throw new Error(err)
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
