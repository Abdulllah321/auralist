"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  MapPin,
  CreditCard,
  Download,
  Truck,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { UserDashboardNav } from "@/components/user-dashboard-nav"
import { mockOrders } from "@/lib/mock-user-data"

interface OrderDetailPageProps {
  params: { id: string }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = mockOrders.find((o) => o.id === params.id)
  const [cancelReason, setCancelReason] = useState("")
  const [returnReason, setReturnReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton title="Order Not Found" />
        <UserDashboardNav>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❓</div>
            <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
            <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
          </div>
        </UserDashboardNav>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "confirmed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "returned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTrackingSteps = () => {
    const steps = [
      { status: "pending", label: "Order Placed", completed: true },
      { status: "confirmed", label: "Order Confirmed", completed: order.status !== "pending" },
      { status: "shipped", label: "Shipped", completed: ["shipped", "delivered"].includes(order.status) },
      { status: "delivered", label: "Delivered", completed: order.status === "delivered" },
    ]
    return steps
  }

  const handleCancelOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    console.log("Order cancelled:", cancelReason)
  }

  const handleReturnOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    console.log("Return requested:", returnReason)
  }

  const canCancel = ["pending", "confirmed"].includes(order.status)
  const canReturn = order.status === "delivered"

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title={`Order ${order.id}`} />

      <UserDashboardNav>
        <div className="space-y-8">
          {/* Order Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Order {order.id}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(order.status)} className="text-lg px-4 py-2">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>

              {order.status === "delivered" && (
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Tracking */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-primary" />
                    Order Tracking
                  </h3>

                  <div className="space-y-6">
                    {getTrackingSteps().map((step, index) => (
                      <div key={step.status} className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div
                            className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {step.label}
                          </div>
                          {step.status === order.status && order.trackingNumber && (
                            <div className="text-sm text-muted-foreground">Tracking: {order.trackingNumber}</div>
                          )}
                        </div>

                        {index < getTrackingSteps().length - 1 && (
                          <div className={`w-px h-8 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {order.estimatedDelivery && (
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          {order.status === "delivered" ? "Delivered on" : "Estimated delivery"}:
                        </span>
                        <span>{new Date(order.deliveredDate || order.estimatedDelivery).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Order Items */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    Order Items
                  </h3>

                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center text-2xl">
                          {item.productImage}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold">{item.productName}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                            {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                            <div>Quantity: {item.quantity}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">${item.price} each</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Order Actions */}
              {(canCancel || canReturn) && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Order Actions</h3>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {canCancel && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="text-destructive hover:text-destructive bg-transparent"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Order</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div className="text-sm">
                                  <div className="font-medium text-yellow-800 dark:text-yellow-200">
                                    Are you sure you want to cancel this order?
                                  </div>
                                  <div className="text-yellow-700 dark:text-yellow-300 mt-1">
                                    This action cannot be undone. You will receive a full refund.
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="cancelReason">Reason for cancellation (optional)</Label>
                                <Textarea
                                  id="cancelReason"
                                  value={cancelReason}
                                  onChange={(e) => setCancelReason(e.target.value)}
                                  placeholder="Please let us know why you're cancelling..."
                                  className="min-h-[100px]"
                                />
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button variant="outline">Keep Order</Button>
                                <Button
                                  onClick={handleCancelOrder}
                                  disabled={isProcessing}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  {isProcessing ? "Cancelling..." : "Cancel Order"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {canReturn && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Package className="h-4 w-4 mr-2" />
                              Return Items
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Return Items</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-sm text-muted-foreground">
                                You can return items within 30 days of delivery for a full refund.
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="returnReason">Reason for return *</Label>
                                <Textarea
                                  id="returnReason"
                                  value={returnReason}
                                  onChange={(e) => setReturnReason(e.target.value)}
                                  placeholder="Please describe the reason for return..."
                                  className="min-h-[100px]"
                                />
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button variant="outline">Cancel</Button>
                                <Button
                                  onClick={handleReturnOrder}
                                  disabled={isProcessing || !returnReason.trim()}
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  {isProcessing ? "Processing..." : "Request Return"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>
                        {order.deliveryFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${order.deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Shipping Address */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Shipping Address
                  </h3>

                  <div className="text-sm space-y-1">
                    <div className="font-medium">{order.shippingAddress.name}</div>
                    <div className="text-muted-foreground">{order.shippingAddress.addressLine1}</div>
                    {order.shippingAddress.addressLine2 && (
                      <div className="text-muted-foreground">{order.shippingAddress.addressLine2}</div>
                    )}
                    <div className="text-muted-foreground">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </div>
                    <div className="text-muted-foreground">{order.shippingAddress.country}</div>
                    <div className="flex items-center space-x-1 mt-2">
                      <Phone className="h-3 w-3" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-primary" />
                    Payment Method
                  </h3>

                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💵</div>
                    <div>
                      <div className="font-medium">{order.paymentMethod}</div>
                      <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Support */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold mb-4">Need Help?</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>support@modernstore.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    Contact Support
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </UserDashboardNav>
    </div>
  )
}
