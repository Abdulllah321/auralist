"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { UserDashboardNav } from "@/components/user-dashboard-nav"
import { mockOrders } from "@/lib/mock-user-data"
import Link from "next/link"
import type { Order } from "@/lib/user-types"

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "amount-high":
          return b.total - a.total
        case "amount-low":
          return a.total - b.total
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return "✅"
      case "shipped":
        return "🚚"
      case "confirmed":
        return "📋"
      case "pending":
        return "⏳"
      case "cancelled":
        return "❌"
      case "returned":
        return "↩️"
      default:
        return "📦"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="My Orders" />

      <UserDashboardNav>
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage all your orders in one place</p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders by ID or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                <SelectItem value="amount-low">Amount: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </motion.div>
            ) : (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{getStatusIcon(order.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">Order {order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Placed on {new Date(order.date).toLocaleDateString()}</div>
                            <div>
                              {order.items.length} item{order.items.length > 1 ? "s" : ""}
                            </div>
                            {order.trackingNumber && <div>Tracking: {order.trackingNumber}</div>}
                            {order.estimatedDelivery && (
                              <div>
                                {order.status === "delivered" ? "Delivered" : "Expected"}:{" "}
                                {new Date(order.deliveredDate || order.estimatedDelivery).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-col lg:items-end space-y-3">
                        <div className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/account/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>

                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center space-x-4 overflow-x-auto">
                        {order.items.slice(0, 4).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3 flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center text-xl">
                              {item.productImage}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm truncate max-w-32">{item.productName}</div>
                              <div className="text-xs text-muted-foreground">
                                Qty: {item.quantity} • ${item.price}
                              </div>
                            </div>
                          </div>
                        ))}

                        {order.items.length > 4 && (
                          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg text-sm font-medium">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Statistics */}
          {filteredOrders.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{filteredOrders.length}</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {filteredOrders.filter((o) => o.status === "delivered").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredOrders.filter((o) => o.status === "shipped").length}
                    </div>
                    <div className="text-sm text-muted-foreground">In Transit</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </UserDashboardNav>
    </div>
  )
}
