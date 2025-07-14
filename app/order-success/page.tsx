"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"

const confettiVariants = {
  initial: { y: -100, opacity: 0, rotate: 0 },
  animate: (i: number) => ({
    y: [0, -20, 600],
    opacity: [0, 1, 0],
    rotate: [0, 180, 360],
    x: [0, Math.random() * 200 - 100, Math.random() * 400 - 200],
    transition: {
      duration: 3,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
}

const checkmarkVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      delay: 0.5,
    },
  },
}

export default function OrderSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const orderDetails = {
    orderId: "ORD-2024-001234",
    estimatedDelivery: "January 18-20, 2024",
    trackingNumber: "TRK123456789",
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header showBackButton title="Order Confirmed" />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: "0%",
              }}
            >
              {["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div
              variants={checkmarkVariants}
              initial="initial"
              animate="animate"
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            >
              Order Placed Successfully! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Thank you for your purchase! Your order is being processed and will be shipped soon.
            </motion.p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="p-8 mb-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold mb-1">Order ID</div>
                  <Badge variant="outline" className="font-mono">
                    {orderDetails.orderId}
                  </Badge>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold mb-1">Estimated Delivery</div>
                  <div className="text-sm text-muted-foreground">{orderDetails.estimatedDelivery}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold mb-1">Tracking Number</div>
                  <Badge variant="outline" className="font-mono">
                    {orderDetails.trackingNumber}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <Link href="/order-summary">
                    <Truck className="mr-2 h-5 w-5" />
                    Track Your Order
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" asChild className="px-8 py-6 text-lg bg-transparent">
                  <Link href="/">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-12 p-6 bg-muted/30 rounded-lg"
            >
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Order confirmation email sent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Processing and packaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Shipped with tracking details</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
