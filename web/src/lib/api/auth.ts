import { AUTH_API } from './config'
import type { LoginCredentials, LoginResponse } from '@shared-types/auth'

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse>  {
    const response = await fetch(`${AUTH_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    if (!response.ok) {
      throw new Error(await response.text())
    }
    
    return response.json()
  }
}
