"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FlameIcon as Fire, Zap, BrainCog, Leaf, Home, Dumbbell } from "lucide-react"
import Link from "next/link"

const trendingItems = [
  {
    id: 1,
    title: "AI-Powered Gadgets",
    description: "Smart devices that learn and adapt",
    icon: BrainCog,
    trend: "+245%",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    description: "Eco-friendly clothing revolution",
    icon: Leaf,
    trend: "+189%",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Home Automation",
    description: "Smart home solutions",
    icon: Home,
    trend: "+156%",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    title: "Fitness Tech",
    description: "Next-gen workout equipment",
    icon: Dumbbell,
    trend: "+134%",
    color: "from-pink-500 to-rose-600",
  },
]

export function TrendingSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Fire className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl sm:text-4xl font-bold">Trending Now</h2>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what's hot and trending in the market right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={`/products?trending=${item.id}`}>
                  <Card className="p-6 cursor-pointer group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/20">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white drop-shadow" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        {item.trend}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
