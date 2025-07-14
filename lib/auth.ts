import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"
import { AuthAPI } from "./auth-api"

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          const response = await AuthAPI.login({
            email: credentials.email,
            password: credentials.password,
          })

          if (response.user) {
            return {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              image: response.user.profileImage,
              role: response.user.role,
              isVerified: response.user.isVerified,
            }
          }

          return null
        } catch (error) {
          console.error("Login error:", error)
          throw new Error("Invalid credentials")
        }
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        // Handle social login - create or update user in external API
        try {
          const userData = {
            name: user.name || "",
            email: user.email || "",
            profileImage: user.image,
            provider: account?.provider,
            providerId: account?.providerAccountId,
          }

          // Call external API to create/update social user
          const response = await AuthAPI.request("/auth/social-login", {
            method: "POST",
            body: JSON.stringify(userData),
          })

          if (response.user) {
            user.id = response.user.id
            user.role = response.user.role
            user.isVerified = response.user.isVerified
          }
        } catch (error) {
          console.error("Social login error:", error)
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.isVerified = user.isVerified
      }

      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.isVerified = token.isVerified as boolean
      }

      return session
    },
  },

  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}
