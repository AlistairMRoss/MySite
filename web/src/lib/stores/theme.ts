import { writable } from 'svelte/store'

const STORAGE_KEY = 'theme_inverted'

const initial = (() => {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
})()

const { subscribe, set, update } = writable<boolean>(initial)

const persist = (value: boolean) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // ignore quota / privacy mode failures
  }
}

export const themeInverted = {
  subscribe,
  toggle(): void {
    update(v => {
      const next = !v
      persist(next)
      return next
    })
  },
  set(value: boolean): void {
    persist(value)
    set(value)
  }
}
