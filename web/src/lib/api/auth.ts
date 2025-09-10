import { client, subjects } from './client'
import type { LoginCredentials, LoginResponse } from '@shared-types/auth'
import { REDIRECT_URI } from './config'

export const authApi = {
  async startAuthFlow(): Promise<{ url: string }> {
    const { url } = await client.authorize(REDIRECT_URI, 'code')
    window.location.href = url.toString()
    return { url }
  },

  async exchangeCodeForTokens(code: string): Promise<any> {
    const tokens = await client.exchange(code, REDIRECT_URI)
    console.log(tokens)
    return tokens
  },

  async verifyTokens(accessToken: string): Promise<object> {
    try {
      const verified = await client.verify(subjects, accessToken)
      return verified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err)
    }

  },

  async login(_credentials: LoginCredentials): Promise<LoginResponse> {
    throw new Error(
      'Direct login not supported with OpenAuth. Use startAuthFlow() instead.'
    )
  }
}
