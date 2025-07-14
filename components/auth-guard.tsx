"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireVerification?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireVerification = false,
  redirectTo = "/auth/login",
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (requireAuth && !session) {
      router.push(redirectTo)
      return
    }

    if (requireVerification && session && !session.user.isVerified) {
      router.push("/auth/verify-email")
      return
    }
  }, [session, status, router, requireAuth, requireVerification, redirectTo])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="text-4xl"
        >
          ⏳
        </motion.div>
      </div>
    )
  }

  if (requireAuth && !session) {
    return null
  }

  if (requireVerification && session && !session.user.isVerified) {
    return null
  }

  return <>{children}</>
}
