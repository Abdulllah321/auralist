"use client"

import { motion } from "framer-motion"
import { Package, MapPin, CreditCard, Calendar, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import Link from "next/link"

const orderData = {
  orderId: "ORD-2024-001234",
  status: "pending",
  orderDate: "January 15, 2024",
  estimatedDelivery: "January 18-20, 2024",
  items: [
    { name: "Premium Wireless Headphones", price: 299, quantity: 1, image: "🎧" },
    { name: "Smart Fitness Watch", price: 199, quantity: 2, image: "⌚" },
    { name: "Organic Cotton T-Shirt", price: 29, quantity: 1, image: "👕" },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    country: "United States",
  },
  paymentMethod: "Cash on Delivery",
  subtotal: 727,
  deliveryFee: 15,
  total: 742,
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-500"
    case "confirmed":
      return "bg-blue-500"
    case "shipped":
      return "bg-purple-500"
    case "delivered":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return "⏳"
    case "confirmed":
      return "✅"
    case "shipped":
      return "🚚"
    case "delivered":
      return "📦"
    default:
      return "❓"
  }
}

export default function OrderSummaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="Order Summary" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Order Status Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="text-6xl mb-4">{getStatusIcon(orderData.status)}</div>
            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">
              Your order <span className="font-semibold text-primary">{orderData.orderId}</span> has been received
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Order Status</h3>
                    <Badge className={`${getStatusColor(orderData.status)} text-white capitalize`}>
                      {orderData.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Order Date</div>
                        <div className="text-sm text-muted-foreground">{orderData.orderDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Estimated Delivery</div>
                        <div className="text-sm text-muted-foreground">{orderData.estimatedDelivery}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Order Items */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Order Items</h3>
                  </div>

                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center text-2xl">
                          {item.image}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">${item.price} each</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Shipping & Payment */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Shipping Address</h3>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="font-medium">{orderData.shippingAddress.name}</div>
                      <div className="text-muted-foreground">{orderData.shippingAddress.address}</div>
                      <div className="text-muted-foreground">{orderData.shippingAddress.city}</div>
                      <div className="text-muted-foreground">{orderData.shippingAddress.country}</div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Payment Method</h3>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">💵</div>
                      <div>
                        <div className="font-medium">{orderData.paymentMethod}</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-1"
            >
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Order Total</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${orderData.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${orderData.deliveryFee.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-primary">${orderData.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/order-success">
                        <Truck className="mr-2 h-4 w-4" />
                        Track Order
                      </Link>
                    </Button>
                  </motion.div>

                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
