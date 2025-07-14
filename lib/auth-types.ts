export interface User {
  id: string
  name: string
  email: string
  phone?: string
  profileImage?: string
  emailVerified?: Date
  isVerified: boolean
  role: "customer" | "seller" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface AuthSession {
  user: User
  expires: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  acceptTerms: boolean
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}

export interface VerifyEmailData {
  token: string
  email: string
}

export interface OTPData {
  email: string
  otp: string
  type: "email_verification" | "password_reset" | "login"
}
