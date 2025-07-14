"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    quantity: 1,
    image: "🎧",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    quantity: 2,
    image: "⌚",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29,
    quantity: 1,
    image: "👕",
    category: "Fashion",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 100 ? 0 : 15
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="Shopping Cart" cartItemCount={cartItems.length} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold mb-6"
              >
                Cart Items ({cartItems.length})
              </motion.h2>

              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center text-3xl">
                          {item.image}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <Badge variant="secondary" className="mt-1">
                                {item.category}
                              </Badge>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive/80 p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-2xl font-bold text-primary">${item.price}</div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
                              >
                                <Minus className="h-4 w-4" />
                              </motion.button>

                              <span className="w-8 text-center font-semibold">{item.quantity}</span>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                              >
                                <Plus className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? <span className="text-green-600">Free</span> : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>

                  {subtotal < 100 && (
                    <div className="text-sm text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free delivery
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    <Link href="/checkout">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Link>
                  </Button>
                </motion.div>

                <Button variant="outline" asChild className="w-full mt-3 bg-transparent">
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
