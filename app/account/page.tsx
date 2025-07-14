"use client"

import { motion } from "framer-motion"
import { Package, Heart, MapPin, User, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { UserDashboardNav } from "@/components/user-dashboard-nav"
import { mockUser, mockOrders } from "@/lib/mock-user-data"
import Link from "next/link"

const quickStats = [
  {
    icon: Package,
    label: "Total Orders",
    value: mockOrders.length.toString(),
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Heart,
    label: "Wishlist Items",
    value: "3",
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    icon: MapPin,
    label: "Saved Addresses",
    value: "2",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Star,
    label: "Reviews Written",
    value: "12",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
]

const recentOrders = mockOrders.slice(0, 3)

export default function AccountDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="My Account" />

      <UserDashboardNav>
        <div className="space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name.split(" ")[0]}! 👋</h1>
            <p className="text-muted-foreground">Manage your orders, profile, and preferences from your dashboard</p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-semibold mb-6">Quick Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                      <div
                        className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Button variant="outline" asChild>
                <Link href="/account/orders">View All Orders</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center text-lg border-2 border-background"
                            >
                              {item.productImage}
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium border-2 border-background">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">Order {order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : order.status === "pending"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <div className="text-lg font-bold mt-1">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" asChild>
                  <Link href="/account/profile">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Update Profile</div>
                        <div className="text-sm text-muted-foreground">Edit personal information</div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" asChild>
                  <Link href="/account/addresses">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Manage Addresses</div>
                        <div className="text-sm text-muted-foreground">Add or edit addresses</div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" asChild>
                  <Link href="/account/seller">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Become a Seller</div>
                        <div className="text-sm text-muted-foreground">Start selling products</div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Account Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Account Status</h3>
                  <p className="text-muted-foreground mb-4">
                    Member since {new Date(mockUser.joinedDate).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Verified Account
                    </Badge>
                    {mockUser.isSeller && <Badge className="bg-primary">Seller Account</Badge>}
                  </div>
                </div>
                <div className="text-6xl">🎉</div>
              </div>
            </Card>
          </motion.div>
        </div>
      </UserDashboardNav>
    </div>
  )
}
