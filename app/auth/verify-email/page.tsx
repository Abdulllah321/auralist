"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthAPI } from "@/lib/auth-api"
import Link from "next/link"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token")

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // If token is provided in URL, verify automatically
    if (token && email) {
      handleTokenVerification()
    }
  }, [token, email])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleTokenVerification = async () => {
    if (!token || !email) return

    setIsLoading(true)
    try {
      await AuthAPI.verifyEmail({ token, email })
      setIsVerified(true)
    } catch (error: any) {
      setError(error.message || "Invalid or expired verification link")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await AuthAPI.verifyOTP({
        email,
        otp,
        type: "email_verification",
      })
      setIsVerified(true)
    } catch (error: any) {
      setError(error.message || "Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return

    setIsResending(true)
    setError("")

    try {
      await AuthAPI.resendOTP(email, "email_verification")
      setCountdown(60) // 60 second cooldown
    } catch (error: any) {
      setError(error.message || "Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-pink-950/20 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="p-8 shadow-2xl border-0 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
              }}
            >
              <Check className="h-10 w-10 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your email has been successfully verified. You can now log in.
              </p>
              <Button variant="default" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-pink-950/20 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="p-8 shadow-2xl border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <Link href="/auth/login">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Please enter the OTP sent to your email to verify your account.
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleOTPVerification}>
            <div className="mb-4">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="mt-2"
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              Verify
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <Button variant="ghost" onClick={handleResendOTP} disabled={isResending || countdown > 0}>
              {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
