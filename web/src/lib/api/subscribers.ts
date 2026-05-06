import { API_V1 } from './config'

export const subscriberApi = {
  async subscribe(email: string): Promise<{ ok: boolean; message?: string }> {
    const res = await fetch(`${API_V1}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (res.ok) return { ok: true }
    const data = await res.json().catch(() => ({}))
    return { ok: false, message: data.error || 'Subscription failed' }
  }
}
