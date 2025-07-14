"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SocialAuthButtonsProps {
  callbackUrl?: string
  isLoading?: boolean
}

export function SocialAuthButtons({ callbackUrl = "/", isLoading = false }: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSocialLogin = async (provider: string) => {
    setLoadingProvider(provider)
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.error(`${provider} login error:`, error)
    } finally {
      setLoadingProvider(null)
    }
  }

  const socialProviders = [
    {
      id: "google",
      name: "Google",
      icon: "🔍",
      bgColor: "bg-red-500 hover:bg-red-600",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "🐙",
      bgColor: "bg-gray-800 hover:bg-gray-900",
    },
  ]

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <motion.div key={provider.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading || loadingProvider !== null}
            variant="outline"
            className="w-full h-12 text-white border-0"
            style={{ backgroundColor: provider.bgColor.split(" ")[0].replace("bg-", "") }}
          >
            {loadingProvider === provider.id ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-2"
              >
                ⏳
              </motion.div>
            ) : (
              <span className="text-2xl mr-3">{provider.icon}</span>
            )}
            Continue with {provider.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
