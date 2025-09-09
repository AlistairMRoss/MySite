export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthState {
  apiKey: string | null,
  refreshToken: string | null,
  accessToken: string | null,
  idToken: string | null,
  isAuthenticated: boolean
}

export interface LoginResponse {
  apiKey: string,
  refresh_token: string,
  access_token: string,
  id_token: string,
  user: string,
  isAuthenticated: boolean
}