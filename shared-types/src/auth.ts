export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthState {
  refreshToken: string | null,
  accessToken: string | null,
  isAuthenticated: boolean,
  expiry: number
}

export interface LoginResponse {
  apiKey: string,
  refresh_token: string,
  access_token: string,
  id_token: string,
  user: string,
  isAuthenticated: boolean
}