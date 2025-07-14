"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Truck, FileText, CheckCircle, Shield, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"

const orderItems = [
  { name: "Premium Wireless Headphones", price: 299, quantity: 1, image: "🎧" },
  { name: "Smart Fitness Watch", price: 199, quantity: 2, image: "⌚" },
  { name: "Organic Cotton T-Shirt", price: 29, quantity: 1, image: "👕" },
]

const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "5-7 business days",
    price: 15,
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "2-3 business days",
    price: 25,
    icon: Clock,
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    description: "Next business day",
    price: 45,
    icon: MapPin,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    orderNote: "",
  })

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const selectedDelivery = deliveryOptions.find((d) => d.id === deliveryMethod)
  const deliveryFee = selectedDelivery?.price || 15
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + deliveryFee + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    router.push("/order-success")
  }

  const progressPercentage = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header showBackButton title="Secure Checkout" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Checkout Progress</span>
            <span className="text-sm text-muted-foreground">{currentStep} of 3</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Shipping Info</span>
            <span>Payment</span>
            <span>Review</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6 shadow-lg border-2 border-primary/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-purple/20 rounded-xl">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Shipping Information</h3>
                    <p className="text-sm text-muted-foreground">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country *
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Enter your country"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Street Address *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your street address"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode" className="text-sm font-medium">
                      Postal Code *
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Enter postal code"
                      className="mt-1 border-2 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Delivery Options */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 shadow-lg border-2 border-primary/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Delivery Options</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred delivery speed</p>
                  </div>
                </div>

                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="p-2 bg-muted rounded-lg">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                {option.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${option.price}</div>
                              {option.id === "standard" && (
                                <Badge variant="secondary" className="text-xs">
                                  Most Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-6 shadow-lg border-2 border-primary/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">Secure and encrypted payment</p>
                  </div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">💵</div>
                          <div>
                            <div className="font-medium">Cash on Delivery</div>
                            <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                          </div>
                        </div>
                      </Label>
                      <Badge className="bg-green-500">Recommended</Badge>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg opacity-50">
                      <RadioGroupItem value="razorpay" id="razorpay" disabled />
                      <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">💳</div>
                          <div>
                            <div className="font-medium">Razorpay (Coming Soon)</div>
                            <div className="text-sm text-muted-foreground">Credit/Debit Card, UPI, Net Banking</div>
                          </div>
                        </div>
                      </Label>
                      <Badge variant="secondary">Soon</Badge>
                    </div>
                  </div>
                </RadioGroup>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Order Note */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-6 shadow-lg border-2 border-primary/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Order Note (Optional)</h3>
                    <p className="text-sm text-muted-foreground">Any special instructions for your order</p>
                  </div>
                </div>

                <Textarea
                  value={formData.orderNote}
                  onChange={(e) => handleInputChange("orderNote", e.target.value)}
                  placeholder="Any special instructions for your order..."
                  className="min-h-[100px] border-2 focus:border-primary transition-colors"
                />
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24 shadow-xl border-2 border-primary/10">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Order Summary
              </h3>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery ({selectedDelivery?.name})</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                className="mt-6"
              >
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-lg py-6 shadow-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        ⏳
                      </motion.div>
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Place Order - ${total.toFixed(2)}</span>
                    </div>
                  )}
                </Button>
              </motion.div>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout powered by SSL encryption</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
