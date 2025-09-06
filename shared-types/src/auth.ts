export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthState {
  apiKey: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

export interface LoginResponse {
  statusCode: string
  message: string
  apiKey: string
  refreshToken: string
  sub: string
}