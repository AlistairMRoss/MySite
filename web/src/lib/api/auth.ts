import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from './config'
import type { LoginCredentials, LoginResponse } from '@shared-types/auth'

export const authApi = {
  startAuthFlow(): void {
    const authUrl = new URL(`${AUTH_URL}/authorize`)
    authUrl.searchParams.set('client_id', CLIENT_ID)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
    authUrl.searchParams.set('scope', 'openid profile email')
    
    window.location.href = authUrl.toString()
  },

  async exchangeCodeForTokens(code: string): Promise<LoginResponse> {
    const response = await fetch(`${AUTH_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI
      })
    })
    
    if (!response.ok) {
      throw new Error(await response.text())
    }
    
    return response.json()
  },

  async login(_credentials: LoginCredentials): Promise<LoginResponse> {
    throw new Error('Direct login not supported with OpenAuth. Use startAuthFlow() instead.')
  }
}

