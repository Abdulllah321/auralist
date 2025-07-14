"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Package, Heart, MapPin, Lock, Store, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { mockUser } from "@/lib/mock-user-data"

const navigationItems = [
  { href: "/account", icon: User, label: "Dashboard", description: "Overview & quick actions" },
  { href: "/account/orders", icon: Package, label: "My Orders", description: "Track your purchases" },
  { href: "/wishlist", icon: Heart, label: "Wishlist", description: "Saved items" },
  { href: "/account/addresses", icon: MapPin, label: "Address Book", description: "Manage addresses" },
  { href: "/account/profile", icon: Settings, label: "Profile Settings", description: "Personal information" },
  { href: "/account/password", icon: Lock, label: "Change Password", description: "Security settings" },
  { href: "/account/seller", icon: Store, label: "Become a Seller", description: "Start selling products" },
]

interface UserDashboardNavProps {
  children: React.ReactNode
}

export function UserDashboardNav({ children }: UserDashboardNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Card className="p-6 sticky top-24">
              {/* User Profile Header */}
              <div className="text-center mb-8">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">{mockUser.profileImage}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{mockUser.name}</h3>
                <p className="text-muted-foreground text-sm">{mockUser.email}</p>
                {mockUser.isSeller && <Badge className="mt-2 bg-primary">Seller Account</Badge>}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div
                            className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                          >
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  )
                })}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </nav>
            </Card>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full justify-between"
            >
              <span>Account Menu</span>
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <Card className="p-4">
                  <div className="text-center mb-6">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarFallback className="text-xl">{mockUser.profileImage}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{mockUser.name}</h3>
                    <p className="text-muted-foreground text-sm">{mockUser.email}</p>
                  </div>

                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link key={item.href} href={item.href}>
                          <div
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </nav>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
