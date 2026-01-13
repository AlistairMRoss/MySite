import type { ExchangeError, ExchangeSuccess, RefreshError, RefreshSuccess, VerifyError, VerifyResult } from '@openauthjs/openauth/client'
import { client, subjects } from './client'
import { REDIRECT_URI } from './config'
interface TokenPayload {
  user: {
    email: string;
  };
}

export const authApi = {
  async startAuthFlow(): Promise<{ url: string }> {
    const { url } = await client.authorize(REDIRECT_URI, 'code')
    window.location.href = url.toString()
    return { url }
  },

  async exchangeCodeForTokens(code: string): Promise<ExchangeSuccess | ExchangeError> {
    const tokens = await client.exchange(code, REDIRECT_URI) as ExchangeSuccess
    console.log(tokens)
    return tokens
  },

  async verifyTokens(accessToken: string): Promise<VerifyResult<TokenPayload> | VerifyError> {
    try {
      const verified = await client.verify(subjects, accessToken)
      return verified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err)
    }
  },

  async refreshToken(refreshToken: string): Promise<Promise<RefreshSuccess | RefreshError>> {
    try {
      const refreshed = await client.refresh(refreshToken)
      return refreshed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
