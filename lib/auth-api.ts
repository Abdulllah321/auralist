// API functions to communicate with external backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.modernstore.com"

type RegisterData = {}

type LoginData = {}

type ForgotPasswordData = {}

type ResetPasswordData = {}

type VerifyEmailData = {}

type OTPData = {}

type User = {}

export class AuthAPI {
  private static async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  static async register(userData: RegisterData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  static async login(credentials: LoginData) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  static async forgotPassword(data: ForgotPasswordData) {
    return this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async resetPassword(data: ResetPasswordData) {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async verifyEmail(data: VerifyEmailData) {
    return this.request("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async verifyOTP(data: OTPData) {
    return this.request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async resendOTP(email: string, type: string) {
    return this.request("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email, type }),
    })
  }

  static async getUserProfile(userId: string, token: string) {
    return this.request(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  static async updateUserProfile(userId: string, userData: Partial<User>, token: string) {
    return this.request(`/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
  }
}
